<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Technology', href: '#' },
    { label: 'Success Stories', href: '#' },
    { label: 'Careers', href: '#' }
  ],
  support: [
    { label: 'Contact', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Technical Support', href: '#' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Compliance', href: '#' }
  ]
}

const certifications = [
  'ISO Stage V Certified',
  'EU Green Tech Partner',
  'CE Compliant',
  'TÜV Approved'
]
</script>

<template>
  <footer class="bg-tech-slate text-white pt-16 pb-8">
    <div class="section-container">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Brand Column -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-12 h-12 bg-forest-green rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">SH</span>
            </div>
            <span class="font-display text-2xl font-bold text-white">
              SmartHarvest
            </span>
          </div>
          <p class="text-white/80 mb-4 leading-relaxed">
            Transforming legacy agricultural equipment into precision farming machines. 
            Upgrade the iron, keep the legacy.
          </p>
          <!-- Social Links -->
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-industrial-amber rounded-lg flex items-center justify-center transition-colors duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-industrial-amber rounded-lg flex items-center justify-center transition-colors duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-industrial-amber rounded-lg flex items-center justify-center transition-colors duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="font-display font-bold text-lg mb-4 text-industrial-amber">Company</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.company" :key="link.label">
              <a :href="link.href" class="text-white/80 hover:text-industrial-amber transition-colors duration-200">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-display font-bold text-lg mb-4 text-industrial-amber">Support</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.support" :key="link.label">
              <a :href="link.href" class="text-white/80 hover:text-industrial-amber transition-colors duration-200">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="font-display font-bold text-lg mb-4 text-industrial-amber">Legal</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.legal" :key="link.label">
              <a :href="link.href" class="text-white/80 hover:text-industrial-amber transition-colors duration-200">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Certifications -->
      <div class="border-t border-white/20 pt-8 mb-8">
        <h4 class="font-display font-bold text-center mb-6 text-industrial-amber">
          Certified & Compliant
        </h4>
        <div class="flex flex-wrap justify-center gap-6">
          <div 
            v-for="cert in certifications" 
            :key="cert"
            class="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20"
          >
            <span class="text-white/90 font-medium">{{ cert }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/20 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-white/70 text-sm">
            © {{ currentYear }} SmartHarvest. All rights reserved.
          </p>
          <p class="text-white/70 text-sm">
            Made with 💚 for farmers who value innovation
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
