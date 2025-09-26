// Test script for all APIs
const baseUrl = 'http://localhost:3000'

async function testAPIs() {
  console.log('🧪 Testing St. Angeloes College APIs...\n')

  // Test 1: Enquiry API
  console.log('1. Testing Enquiry API...')
  try {
    const response = await fetch(`${baseUrl}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Parent',
        email: 'parent@example.com',
        phone: '9876543210',
        classInterested: 'nursery',
        message: 'Interested in admission for my child'
      })
    })
    const result = await response.json()
    console.log('✅ Enquiry API:', result.success ? 'Working' : 'Failed')
    if (result.success) console.log('   Enquiry ID:', result.id)
  } catch (error) {
    console.log('❌ Enquiry API: Failed -', error.message)
  }

  // Test 2: Gallery API
  console.log('\n2. Testing Gallery API...')
  try {
    const response = await fetch(`${baseUrl}/api/gallery?section=campus`)
    const result = await response.json()
    console.log('✅ Gallery API:', result.success ? 'Working' : 'Failed')
    if (result.success) console.log('   Gallery items:', result.data.length)
  } catch (error) {
    console.log('❌ Gallery API: Failed -', error.message)
  }

  // Test 3: News API
  console.log('\n3. Testing News API...')
  try {
    const response = await fetch(`${baseUrl}/api/news?limit=5`)
    const result = await response.json()
    console.log('✅ News API:', result.success ? 'Working' : 'Failed')
    if (result.success) console.log('   News items:', result.data.length)
  } catch (error) {
    console.log('❌ News API: Failed -', error.message)
  }

  // Test 4: Admin Enquiries API
  console.log('\n4. Testing Admin Enquiries API...')
  try {
    const response = await fetch(`${baseUrl}/api/admin/enquiries`)
    const result = await response.json()
    console.log('✅ Admin API:', result.success ? 'Working' : 'Failed')
    if (result.success) console.log('   Total enquiries:', result.count)
  } catch (error) {
    console.log('❌ Admin API: Failed -', error.message)
  }

  console.log('\n🎯 Test completed!')
  console.log('\n📱 Access your admin portal at: http://localhost:3000/admin')
}

testAPIs()
