const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ghtknlnujpaipdgbjvqa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodGtubG51anBhaXBkZ2JqdnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4Nzk5NDIsImV4cCI6MjA3NDQ1NTk0Mn0.kTXFd4Nz9LVgHMKnUMteCqy9HEVIJjRj6lUcEAmrxS0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase
      .from('enquiries')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Connection failed:', error.message)
      console.log('\nPlease run the SQL schema in your Supabase dashboard first!')
      console.log('Go to: https://supabase.com/dashboard/project/ghtknlnujpaipdgbjvqa')
      console.log('Click SQL Editor and run the contents of database/schema.sql')
    } else {
      console.log('✅ Connection successful!')
      console.log('Database is ready to use.')
    }
  } catch (err) {
    console.error('Error:', err.message)
  }
}

testConnection()
