import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    // GET: Listar usuarios con sus roles
    // ------------------------------------------------------------------
    if (req.method === 'GET') {
      // 1. Obtener usuarios de auth
      const {
        data: { users },
        error: listError,
      } = await supabaseClient.auth.admin.listUsers();
      if (listError) throw listError;

      // 2. Obtener roles de public.usuarios
      // Obtenemos solo id y rol para ser eficientes
      const { data: rolesData, error: rolesError } = await supabaseClient.from('usuarios').select('id, rol');

      if (rolesError) throw rolesError;

      // 3. Crear mapa de roles para búsqueda rápida
      const rolesMap = new Map();
      rolesData?.forEach((r: any) => rolesMap.set(r.id, r.rol));

      // 4. Combinar datos
      const enrichedUsers = users.map((u) => ({
        ...u,
        rol: rolesMap.get(u.id) || 'empleado', // Default a empleado si no tiene rol asignado
      }));

      return new Response(JSON.stringify(enrichedUsers), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
    }

    // ------------------------------------------------------------------
    // POST: Crear usuario y asignar rol
    // ------------------------------------------------------------------
    if (req.method === 'POST') {
      const { email, password, rol } = await req.json();

      // Validaciones básicas
      if (!email || !password || !rol) {
        return new Response(JSON.stringify({ error: 'Email, password y rol son requeridos' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // 1. Crear usuario en auth
      const { data: userData, error: createError } = await supabaseClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Confirmar automáticamente
      });

      if (createError) throw createError;
      if (!userData.user) throw new Error('No se pudo crear el usuario');

      // 2. Insertar rol en public.usuarios
      const { error: roleInsertError } = await supabaseClient.from('usuarios').insert({
        id: userData.user.id,
        rol: rol,
      });

      if (roleInsertError) {
        // Opcional: Podríamos borrar el usuario de auth si falla esto para mantener consistencia
        // await supabaseClient.auth.admin.deleteUser(userData.user.id)
        throw roleInsertError;
      }

      return new Response(JSON.stringify({ user: userData.user, message: 'Usuario creado exitosamente' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
  }
});
