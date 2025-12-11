// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//   console.log('Seeding database...')
  
//   try {
//     // Create default roles - handle duplicates manually
//     console.log('Creating roles...')
    
//     const rolesToCreate = [
//       {
//         name: 'ADMIN',
//         description: 'Administrator with full access',
//         permissions: 'users:*,posts:*,media:*,invoices:*,settings:*'
//       },
//       {
//         name: 'EDITOR',
//         description: 'Editor with content management access',
//         permissions: 'posts:create,posts:read,posts:update,media:create,media:read'
//       },
//       {
//         name: 'USER',
//         description: 'Regular user with basic access',
//         permissions: 'profile:read,profile:update'
//       }
//     ]
    
//     for (const roleData of rolesToCreate) {
//       try {
//         await prisma.role.create({
//           data: roleData
//         })
//         console.log(`Created role: ${roleData.name}`)
//       } catch (error: any) {
//         if (error.code === 'P2002') { // Unique constraint violation
//           console.log(`Role ${roleData.name} already exists`)
//         } else {
//           console.log(`Error creating role ${roleData.name}:`, error.message)
//         }
//       }
//     }
    
//     // Create default settings
//     console.log('\nCreating settings...')
    
//     const settingsToCreate = [
//       { key: 'site_name', value: 'Dashboard Pro', category: 'general' },
//       { key: 'site_description', value: 'Modern dashboard application', category: 'general' },
//       { key: 'currency', value: 'USD', category: 'billing' },
//       { key: 'timezone', value: 'UTC', category: 'general' },
//       { key: 'maintenance_mode', value: 'false', type: 'boolean', category: 'system' },
//     ]
    
//     for (const settingData of settingsToCreate) {
//       try {
//         await prisma.setting.create({
//           data: settingData
//         })
//         console.log(`Created setting: ${settingData.key}`)
//       } catch (error: any) {
//         if (error.code === 'P2002') {
//           console.log(`Setting ${settingData.key} already exists`)
//         } else {
//           console.log(`Error creating setting ${settingData.key}:`, error.message)
//         }
//       }
//     }
    
//     // Create a default admin user if doesn't exist
//     console.log('\nCreating admin user...')
    
//     const adminEmail = 'admin@example.com'
//     const existingAdmin = await prisma.user.findUnique({
//       where: { email: adminEmail }
//     })
    
//     if (!existingAdmin) {
//       const adminRole = await prisma.role.findFirst({
//         where: { name: 'ADMIN' }
//       })
      
//       // Note: In production, use bcrypt.hash() for passwords
//       const adminUser = await prisma.user.create({
//         data: {
//           name: 'Admin User',
//           email: adminEmail,
//           password: 'admin123', // CHANGE THIS IN PRODUCTION!
//           role: 'ADMIN',
//           roleId: adminRole?.id,
//           emailVerified: new Date(),
//           status: 'active'
//         }
//       })
      
//       console.log('✅ Created admin user:', adminUser.email)
//       console.log('📝 Login with: admin@example.com / admin123')
//     } else {
//       console.log('⚠️ Admin user already exists')
//     }
    
//     // Create test users
//     console.log('\nCreating test users...')
    
//     const testUsers = [
//       { name: 'Editor User', email: 'editor@example.com', password: 'editor123', role: 'EDITOR' },
//       { name: 'Regular User', email: 'user@example.com', password: 'user123', role: 'USER' },
//     ]
    
//     for (const userData of testUsers) {
//       try {
//         const existingUser = await prisma.user.findUnique({
//           where: { email: userData.email }
//         })
        
//         if (!existingUser) {
//           const role = await prisma.role.findFirst({
//             where: { name: userData.role }
//           })
          
//           await prisma.user.create({
//             data: {
//               name: userData.name,
//               email: userData.email,
//               password: userData.password,
//               role: userData.role,
//               roleId: role?.id,
//               emailVerified: new Date(),
//               status: 'active'
//             }
//           })
//           console.log(`✅ Created ${userData.role.toLowerCase()} user:`, userData.email)
//         } else {
//           console.log(`⚠️ ${userData.role} user already exists:`, userData.email)
//         }
//       } catch (error: any) {
//         console.log(`Error creating user ${userData.email}:`, error.message)
//       }
//     }
    
//     console.log('\n🎉 Seeding completed successfully!')
    
//   } catch (error: any) {
//     console.error('❌ Seeding error:', error.message)
//     if (error.code) console.error('Error code:', error.code)
//   }
// }

// main()
//   .catch((e) => {
//     console.error('Fatal error:', e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  try {
    // Create default roles - handle duplicates manually
    console.log('Creating roles...')
    
    const rolesToCreate = [
      {
        name: 'ADMIN',
        description: 'Administrator with full access',
        permissions: ['users:*', 'posts:*', 'media:*', 'invoices:*', 'settings:*']
      },
      {
        name: 'EDITOR',
        description: 'Editor with content management access',
        permissions: ['posts:create', 'posts:read', 'posts:update', 'media:create', 'media:read']
      },
      {
        name: 'USER',
        description: 'Regular user with basic access',
        permissions: ['profile:read', 'profile:update']
      }
    ]
    
    for (const roleData of rolesToCreate) {
      try {
        await prisma.role.create({
          data: roleData
        })
        console.log(`Created role: ${roleData.name}`)
      } catch (error: any) {
        if (error.code === 'P2002') { // Unique constraint violation
          console.log(`Role ${roleData.name} already exists`)
        } else {
          console.log(`Error creating role ${roleData.name}:`, error.message)
        }
      }
    }
    
    // Create default settings
    console.log('\nCreating settings...')
    
    const settingsToCreate = [
      { key: 'site_name', value: 'Dashboard Pro', category: 'general' },
      { key: 'site_description', value: 'Modern dashboard application', category: 'general' },
      { key: 'currency', value: 'USD', category: 'billing' },
      { key: 'timezone', value: 'UTC', category: 'general' },
      { key: 'maintenance_mode', value: 'false', type: 'boolean', category: 'system' },
    ]
    
    for (const settingData of settingsToCreate) {
      try {
        await prisma.setting.create({
          data: settingData
        })
        console.log(`Created setting: ${settingData.key}`)
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log(`Setting ${settingData.key} already exists`)
        } else {
          console.log(`Error creating setting ${settingData.key}:`, error.message)
        }
      }
    }
    
    // Create a default admin user if doesn't exist
    console.log('\nCreating admin user...')
    
    const adminEmail = 'admin@example.com'
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    })
    
    if (!existingAdmin) {
      const adminRole = await prisma.role.findFirst({
        where: { name: 'ADMIN' }
      })
      
      // Note: In production, use bcrypt.hash() for passwords
      const adminUser = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: adminEmail,
          password: 'admin123', // CHANGE THIS IN PRODUCTION!
          role: 'ADMIN',
          roleId: adminRole?.id,
          emailVerified: new Date(),
          status: 'active'
        }
      })
      
      console.log('✅ Created admin user:', adminUser.email)
      console.log('📝 Login with: admin@example.com / admin123')
    } else {
      console.log('⚠️ Admin user already exists')
    }
    
    // Create test users
    console.log('\nCreating test users...')
    
    const testUsers = [
      { name: 'Editor User', email: 'editor@example.com', password: 'editor123', role: 'EDITOR' },
      { name: 'Regular User', email: 'user@example.com', password: 'user123', role: 'USER' },
    ]
    
    for (const userData of testUsers) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: userData.email }
        })
        
        if (!existingUser) {
          const role = await prisma.role.findFirst({
            where: { name: userData.role }
          })
          
          await prisma.user.create({
            data: {
              name: userData.name,
              email: userData.email,
              password: userData.password,
              role: userData.role,
              roleId: role?.id,
              emailVerified: new Date(),
              status: 'active'
            }
          })
          console.log(`✅ Created ${userData.role.toLowerCase()} user:`, userData.email)
        } else {
          console.log(`⚠️ ${userData.role} user already exists:`, userData.email)
        }
      } catch (error: any) {
        console.log(`Error creating user ${userData.email}:`, error.message)
      }
    }
    
    console.log('\n🎉 Seeding completed successfully!')
    
  } catch (error: any) {
    console.error('❌ Seeding error:', error.message)
    if (error.code) console.error('Error code:', error.code)
  }
}

main()
  .catch((e) => {
    console.error('Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })