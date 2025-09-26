require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file.');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  console.log('🔧 Creating admin user in Supabase Auth...');

  try {
    // Admin credentials
    const adminEmail = 'admin@stangeloescollege.com';
    const adminPassword = 'StAngeloes2024!';
    
    // Create the admin user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
        name: 'St. Angeloes College Admin'
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ Admin user already exists');
        
        // Update existing user to have admin role
        const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) {
          throw listError;
        }
        
        const adminUser = users.users.find(user => user.email === adminEmail);
        if (adminUser) {
          const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
            user_metadata: {
              role: 'admin',
              name: 'St. Angeloes College Admin'
            }
          });
          
          if (updateError) {
            throw updateError;
          }
          console.log('✅ Updated existing user with admin role');
        }
      } else {
        throw error;
      }
    } else {
      console.log('✅ Admin user created successfully');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
      console.log('👤 User ID:', data.user.id);
    }

    console.log('\n🎉 Admin user setup complete!');
    console.log('You can now login to the admin panel with:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

createAdminUser();
