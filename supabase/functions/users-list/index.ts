import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
};

serve(async (req) => {
  // Manejo de preflight request para CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verificar autorización
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Crear cliente de Supabase con Service Role Key
    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Validar usuario que hace la petición
    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ------------------------------------------------------------------
    // GET: Listar usuarios con sus roles y estado
    // ------------------------------------------------------------------
    if (req.method === 'GET') {
      const {
        data: { users },
        error: listError,
      } = await supabaseClient.auth.admin.listUsers();
      if (listError) throw listError;

      const { data: publicData, error: publicError } = await supabaseClient.from('usuarios').select('id, rol, estado');

      if (publicError) throw publicError;

      const publicMap = new Map();
      publicData?.forEach((r: any) => publicMap.set(r.id, { rol: r.rol, estado: r.estado }));

      const enrichedUsers = users.map((u) => {
        const publicInfo = publicMap.get(u.id);
        return {
          ...u,
          rol: publicInfo?.rol || 'empleado',
          estado: publicInfo?.estado !== false,
        };
      });

      return new Response(JSON.stringify(enrichedUsers), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
    }

    // ------------------------------------------------------------------
    // POST: Crear usuario, asignar rol y estado
    // ------------------------------------------------------------------
    if (req.method === 'POST') {
      const { email, password, rol, estado = true } = await req.json();

      if (!email || !password || !rol) {
        return new Response(JSON.stringify({ error: 'Email, password y rol son requeridos' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const { data: userData, error: createError } = await supabaseClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError) throw createError;
      if (!userData.user) throw new Error('No se pudo crear el usuario');

      const { error: publicInsertError } = await supabaseClient.from('usuarios').insert({
        id: userData.user.id,
        rol: rol,
        estado: estado,
      });

      if (publicInsertError) throw publicInsertError;

      return new Response(JSON.stringify({ user: userData.user, message: 'Usuario creado exitosamente' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 });
    }

    // ------------------------------------------------------------------
    // PATCH: Actualizar usuario (rol, estado)
    // ------------------------------------------------------------------
    if (req.method === 'PATCH') {
      const { id, rol, estado } = await req.json();

      if (!id) {
        return new Response(JSON.stringify({ error: 'ID es requerido' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Preparamos objeto con campos definidos
      const updates: any = {};
      if (rol !== undefined) updates.rol = rol;
      if (estado !== undefined) updates.estado = estado;

      if (Object.keys(updates).length === 0) {
        return new Response(JSON.stringify({ message: 'Nada que actualizar' }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const { error: updateError } = await supabaseClient.from('usuarios').update(updates).eq('id', id);

      if (updateError) throw updateError;

      return new Response(JSON.stringify({ message: 'Usuario actualizado exitosamente' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
  }
});
