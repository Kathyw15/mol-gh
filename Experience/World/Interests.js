import * as THREE from 'three'
import Experience from '../Experience.js'
import { EventEmitter } from 'events'
import gsap from 'gsap'

export default class Interests {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.debug = this.experience.debug
    this.device = this.sizes.device
    this.scrolling = this.experience.scrolling

    this.sizes.on('switchdevice', (device) => {
      this.device = device
      console.log(device);
    })

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('interest1')
    }

    this.obj = {
      x: 4,
      y: 1.2,
      z: 0.5
    }

    // Setup
    this.points = []
    this.raycaster = new THREE.Raycaster()
    this.setInterests()
    this.showInfos()
  }

  setInterests() {
    this.points = [
      {
        position: new THREE.Vector3(2.62, 1.3, 0.9),
        element: document.querySelector('.mcba')
      },
      {
        position: new THREE.Vector3(-0.65, 0.17, -1.2),
        element: document.querySelector('.arcadia')
      },
      {
        position: new THREE.Vector3(-4.26, 1.17, 0.66),
        element: document.querySelector('.lumen')
      },
      // {
      //   position: new THREE.Vector3(3.12, 0.17, 0.41),
      //   element: document.querySelector('.nabi')
      // },
      {
        position: new THREE.Vector3(-3.75, 1.2, -1.55),
        element: document.querySelector('.elysee')
      },
      // {
      //   position: new THREE.Vector3(-3.75, 1.2, 0.25),
      //   element: document.querySelector('.mudac')
      // },
    ]

    // Debug
    if(this.debug.active) {
        this.debugFolder
        .add(this.points[2].position, 'x')
        .name('x2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[2].position, 'y')
        .name('y2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[2].position, 'z')
        .name('z2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'x')
        .name('x1')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'y')
        .name('y1')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'z')
        .name('z1')
        .min(-10)
        .max(10)
        .step(0.01)
    }
  }

  showInfos() {
    const mcba = document.querySelector('.mcba')
    const mudac = document.querySelector('.mudac')
    const elysee = document.querySelector('.elysee')
    const arcadia = document.querySelector('.arcadia')
    const nabi = document.querySelector('.nabi')
    const lumen = document.querySelector('.lumen')

    const closeIcn = document.querySelector('.close')

    const infoPanel = document.querySelector('.info-panel')
    const infoPanelImage = document.querySelector('.info-panel-image')
    const infoPanelLogo = document.querySelector('.info-panel-logo')
    const infoPanelTitle = document.querySelector('.info-panel-title')
    const infoPanelLead = document.querySelector('.info-panel-lead')
    const infoPanelDescription = document.querySelector('.info-panel-description')
    const infoPanelMo = document.querySelector('.info-panel-monday')
    const infoPanelTu = document.querySelector('.info-panel-tuesday')
    const infoPanelWe = document.querySelector('.info-panel-wednesday')
    const infoPanelTh = document.querySelector('.info-panel-thursday')
    const infoPanelFr = document.querySelector('.info-panel-friday')
    const infoPanelSa = document.querySelector('.info-panel-saturday')
    const infoPanelSu = document.querySelector('.info-panel-sunday')
    const infoPanelPhone = document.querySelector('.info-panel-phone')
    const infoPanelEmail = document.querySelector('.info-panel-email')
    const infoPanelWebsite = document.querySelector('.info-panel-website')
    let infoPanelRightStyle = '0'

    const infos = [
      // Museums
      {
        'image': '/mol/images/Rehal.jpg' ,
        'logo': '/mol/images/MOL.png',
        'title': 'Non-Western Display Devices',
        'lead': 'Non-Western Display Device is an innovative exhibit that challenges the conventional narrative perpetuated by commercial 3D image libraries, which often promote a Western-centric view of technology and design.',
        'description': `This exhibit, part of the Missing Object Library (MOL), showcases an array of display devices and communication tools rooted in non-Western cultures and traditions. By bringing together the work of diverse artists, designers, and historians, MOL aims to shift the focus from the mainstream narrative and celebrate the rich technological heritage of non-Western societies. "Non-Western Display Device" features a thoughtfully curated collection of 3D models representing various communication tools and devices, such as the rehel, an X-shaped foldable book rest used in Islamic societies. <br><br>
        Through this exhibit, we invite you to delve into the world of non-Western innovations and discover the untold stories behind these display devices. MOL strives to create a more inclusive and equitable representation of technology in new media art and commercial projects, empowering creators, educators, and the general public to engage with diverse perspectives and embrace the wide array of human experiences.`,
        'schedule': [
          'Closed',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 20:00',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 18:00'
        ],
        'contact': [
          '+41 21 316 34 45',
          'mcba@plateforme10.ch'
        ],
        'website': 'https://www.mcba.ch/en/'
      },
      {
        'image': '/mol/images/img-mudac.jpg',
        'logo': '/mol/images/logo-mudac.svg',
        'title': 'Musée Cantonal de Design et d’Arts Appliqués Contemporains',
        'lead': 'mudac – Lausanne’s Museum of Contemporary Design and Applied Arts – is the only institution in Western Switzerland entirely dedicated to design.',
        'description': `It has developed its identity and international reputation through hundreds of ambitious and often unusual exhibitions and continues to pursue a policy of openness and exchange between the many disciplines of contemporary creation. <br><br>
        Its programme showcases designers and artists at solo exhibitions and extends to exhibitions that question the public on contemporary social issues. It demonstrates the museum’s interest in the world and in the wide scope that the term design itself can encompass. <br><br>
        The diversity of points of view of each project has enabled mudac to assert itself both on the national and international scene by offering its exhibitions to its counterparts. Europe and Asia have thus been able to discover exhibitions made in mudac on numerous occasions.`,
        'schedule': [
          '10:00 - 18:00',
          'Closed',
          '10:00 - 18:00',
          '10:00 - 20:00',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 18:00'
        ],
        'contact': [
          '+41 21 318 44 00',
          'mudac@plateforme10.ch'
        ],
        'website': 'https://mudac.ch/en/'
      },
      {
        'image': '/mol/images/Groupphoto.png',
        'logo': 'MOL.png',
        'title': 'Our Vision',
        'lead': 'MOL is envisioned and developed by Jill Miller, Asma Kazmi and Kathy Wang to imagine just digital futures.',
        'description': `Jill Miller is a visual artist and Assistant Professor in Art Practice at UC Berkeley. She works across a wide range of media, from video installation to public practices (and many hybrids in between). She often collaborates with individuals and local communities in the form of public interventions, workshops, and participatory community projects. 
        <br><br> Asma Kazmi is an artist who blends physical and virtual spaces. Her sculptures, connoting materiality, cultural lineage, and craft are juxtaposed with virtual and augmented reality models of art historical objects and particular geographies. Taking an expansive approach to installation art, she researches and reassesses the intertwining histories of Western colonialism and her diasporic Muslim culture. Using transgressive curatorial tactics, she combines visual and textual detritus from historical manuscripts, photographs, archival material, fragments of locations, and mixes them with her own “critical fabulation.” Drawing on her own history as a third generation émigré, migrating across continents, Kazmi’s installations are experimental museums that make use of Islamic display devices and strategies to address colonial and indigenous technologies and knowledge systems, global flows of people and commodities, and interspecies entanglements.
        <br><br> 
        Kathy is an designer, researcher and creative technologist based in the Bay Area. She specializes in designing prototypes, interfaces and interactions for emerging technologies like AR/VR and Artificial Intelligence, exploring the possibilities at the intersection of reality and the digital world.`,
    
        'website': 'https://elysee.ch/en'
      },
      // Restaurants & Cafés
      {
        'image': '/mol/images/About-image.png',
        'logo': '',
        'title': 'ABOUT',
        'lead': `MISSING OBJECT LIBRARY`,
        'description': `In our research as new media artists and educators, we have found that commercial 3D image libraries (virtual storefronts with digital assets used in game design, Hollywood special effects, etc) almost exclusively sell depersonalized and culturally non-specific 3D objects for mass consumption and mainstream use. Employed across many domains, from VR experiences to corporate marketing, these models are conservative in form and structure, and anchored in a capitalist studio production mold. They are devoid of a provenance, an aura (in Walter Benjamin’s terms), and a sense of history. <br><br> The limitations of the commercial asset libraries create a media landscape that reinscribes notions of false neutrality, reaffirming Audre Lorde’s “mythical norm” postulation, privileging representations of a material culture for the “white, thin, male, young, heterosexual, Christian, and financially secure”. Biases within the 3D model marketplace undergird marginality and shape a narrative that misrepresents the “real world” – erasing diverse experiences, voices, and cultural objects. 
        <br><br>
        We are currently developing the Missing Object Library (MOL), a web-based curated repository of hand-made digital objects that fill a void in the existing offerings from companies who provide fully rendered 3D models to “game developers, news agencies, architects, visual effects studios, advertisers, and creative professionals around the world” (TurboSquid). MOL disrupts historical gatekeeping performed by “neutral” marketplaces by offering 3D modeled objects with an intersectional lens spanning a wide range of identities beyond the white, cis, heteronormative domain. MOL expands the possibilities of new media art and commercial projects by providing creators with a carefully curated library of models that consider a range of social categorizations such as race, class, gender, and disability. 

        `,
        'schedule': [
          '10:00 - 23:00',
          'Closed',
          '10:00 - 23:00',
          '10:00 - 23:00',
          '10:00 - 23:00',
          '10:00 - 23:00',
          '10:00 - 18:00'
        ],
        'contact': [
          '+41 21 318 44 10',
          'info@arcadiarestaurant.ch'
        ],
        'website': 'https://www.arcadiarestaurant.ch/'
      },
      {
        'image': '/mol/images/img-nabi.jpg',
        'logo': '/mol/images/MOL.png',
        'title': 'Le Nabi Café-Restaurant',
        'lead': `Traditional cuisine to savour before or after a visit to Plateforme 10!`,
        'description': `The menu aims to be inviting, familial, yet inventive. Traditional cooking is restyled while the menu follows the seasons by adapting to the harvest of local producers. The drinks are artisanal. Meticulous service at reasonable prices for a convivial moment that everyone can afford to enjoy. Kids are very much welcome, too. Menu selections are designed for savory discoveries, and a play area encourages creativity.`,
        'schedule': [
          'Closed',
          '09:30 - 18:00',
          '09:30 - 18:00',
          '09:30 - 20:00',
          '09:30 - 18:00',
          '09:30 - 18:00',
          '09:30 - 18:00'
        ],
        'contact': [
          '+41 21 311 02 90',
          'info@lenabi.ch'
        ],
        'website': 'https://www.mcba.ch/en/cafe-restaurant-2/'
      },
      {
        'image': '/mol/images/trashcan.png',
        'logo': '/mol/images/MOL.png',
        'title': 'Hidden Hygiene',
        'lead': `Hidden Hygiene" is a groundbreaking exhibit that challenges the limitations of commercial 3D image libraries, which perpetuate false neutrality and the "mythical norm" as described by Audre Lorde.`,
        'description': `This exhibit, part of the Missing Object Library (MOL), focuses on personal care objects and practices, viewed through the lens of feminist technologies. By offering 3D models that consider a range of social categorizations, MOL disrupts the historical gatekeeping of mainstream asset libraries. "Hidden Hygiene" showcases thoughtfully curated models by diverse artists, designers, and historians, illuminating the unique experiences of women and non-binary individuals from various cultures and backgrounds. <br><br> Explore the untold stories of personal care, from menstrual care innovations to adaptive aids for mothers with disabilities. As an open platform, MOL aims to critique existing 3D model databases and inspire a more inclusive dialogue around hygiene and self-care, empowering creators, educators, and the general public to engage with diverse perspectives and embrace the richness of human experiences.`,
        'schedule': [
          '10:00 - 18:00',
          'Closed',
          '10:00 - 18:00',
          '10:00 - 20:00',
          '10:00 - 18:00',
          '10:00 - 18:00',
          '10:00 - 18:00'
        ],
        'contact': [
          '+41 21 311 02 90',
          'info@cafelumen.ch'
        ],
        'website': 'https://mudac.ch/de/cafe-lumen/'
      }
    ]

    if (this.device === 'desktop') {
      infoPanelRightStyle  = '-33%'
    } else {
      infoPanelRightStyle  = '-100%'
    }

    mcba.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[0].image
      infoPanelLogo.src = infos[0].logo
      infoPanelTitle.innerHTML = infos[0].title
      infoPanelLead.innerHTML = infos[0].lead
      infoPanelDescription.innerHTML = infos[0].description
      infoPanelMo.innerHTML = infos[0].schedule[0]
      infoPanelTu.innerHTML = infos[0].schedule[1]
      infoPanelWe.innerHTML = infos[0].schedule[2]
      infoPanelTh.innerHTML = infos[0].schedule[3]
      infoPanelFr.innerHTML = infos[0].schedule[4]
      infoPanelSa.innerHTML = infos[0].schedule[5]
      infoPanelSu.innerHTML = infos[0].schedule[6]
      infoPanelPhone.innerHTML = infos[0].contact[0]
      infoPanelEmail.innerHTML = infos[0].contact[1]
      infoPanelWebsite.href = infos[0].website
    });

    mudac.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[1].image
      infoPanelLogo.src = infos[1].logo
      infoPanelTitle.innerHTML = infos[1].title
      infoPanelLead.innerHTML = infos[1].lead
      infoPanelDescription.innerHTML = infos[1].description
      infoPanelMo.innerHTML = infos[1].schedule[0]
      infoPanelTu.innerHTML = infos[1].schedule[1]
      infoPanelWe.innerHTML = infos[1].schedule[2]
      infoPanelTh.innerHTML = infos[1].schedule[3]
      infoPanelFr.innerHTML = infos[1].schedule[4]
      infoPanelSa.innerHTML = infos[1].schedule[5]
      infoPanelSu.innerHTML = infos[1].schedule[6]
      infoPanelPhone.innerHTML = infos[1].contact[0]
      infoPanelEmail.innerHTML = infos[1].contact[1]
      infoPanelWebsite.href = infos[1].website
    });

    elysee.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[2].image
      infoPanelLogo.src = infos[2].logo
      infoPanelTitle.innerHTML = infos[2].title
      infoPanelLead.innerHTML = infos[2].lead
      infoPanelDescription.innerHTML = infos[2].description
      infoPanelMo.innerHTML = infos[2].schedule[0]
      infoPanelTu.innerHTML = infos[2].schedule[1]
      infoPanelWe.innerHTML = infos[2].schedule[2]
      infoPanelTh.innerHTML = infos[2].schedule[3]
      infoPanelFr.innerHTML = infos[2].schedule[4]
      infoPanelSa.innerHTML = infos[2].schedule[5]
      infoPanelSu.innerHTML = infos[2].schedule[6]
      infoPanelPhone.innerHTML = infos[2].contact[0]
      infoPanelEmail.innerHTML = infos[2].contact[1]
      infoPanelWebsite.href = infos[2].website
    });

    arcadia.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[3].image
      infoPanelLogo.src = infos[3].logo
      infoPanelTitle.innerHTML = infos[3].title
      infoPanelLead.innerHTML = infos[3].lead
      infoPanelDescription.innerHTML = infos[3].description
      infoPanelMo.innerHTML = infos[3].schedule[0]
      infoPanelTu.innerHTML = infos[3].schedule[1]
      infoPanelWe.innerHTML = infos[3].schedule[2]
      infoPanelTh.innerHTML = infos[3].schedule[3]
      infoPanelFr.innerHTML = infos[3].schedule[4]
      infoPanelSa.innerHTML = infos[3].schedule[5]
      infoPanelSu.innerHTML = infos[3].schedule[6]
      infoPanelPhone.innerHTML = infos[3].contact[0]
      infoPanelEmail.innerHTML = infos[3].contact[1]
      infoPanelWebsite.href = infos[3].website
    });

    nabi.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[4].image
      infoPanelLogo.src = infos[4].logo
      infoPanelTitle.innerHTML = infos[4].title
      infoPanelLead.innerHTML = infos[4].lead
      infoPanelDescription.innerHTML = infos[4].description
      infoPanelMo.innerHTML = infos[4].schedule[0]
      infoPanelTu.innerHTML = infos[4].schedule[1]
      infoPanelWe.innerHTML = infos[4].schedule[2]
      infoPanelTh.innerHTML = infos[4].schedule[3]
      infoPanelFr.innerHTML = infos[4].schedule[4]
      infoPanelSa.innerHTML = infos[4].schedule[5]
      infoPanelSu.innerHTML = infos[4].schedule[6]
      infoPanelPhone.innerHTML = infos[4].contact[0]
      infoPanelEmail.innerHTML = infos[4].contact[1]
      infoPanelWebsite.href = infos[4].website
    });

    lumen.addEventListener('click', () => {
      this.scrolling.target = 0
      infoPanel.style.right = '0'
      infoPanelImage.src = infos[5].image
      infoPanelLogo.src = infos[5].logo
      infoPanelTitle.innerHTML = infos[5].title
      infoPanelLead.innerHTML = infos[5].lead
      infoPanelDescription.innerHTML = infos[5].description
      infoPanelMo.innerHTML = infos[5].schedule[0]
      infoPanelTu.innerHTML = infos[5].schedule[1]
      infoPanelWe.innerHTML = infos[5].schedule[2]
      infoPanelTh.innerHTML = infos[5].schedule[3]
      infoPanelFr.innerHTML = infos[5].schedule[4]
      infoPanelSa.innerHTML = infos[5].schedule[5]
      infoPanelSu.innerHTML = infos[5].schedule[6]
      infoPanelPhone.innerHTML = infos[5].contact[0]
      infoPanelEmail.innerHTML = infos[5].contact[1]
      infoPanelWebsite.href = infos[5].website
    });

    closeIcn.addEventListener('click', () => {
      infoPanel.style.right = infoPanelRightStyle
    });
  }

  resize() {}

  update() {
    for(const point of this.points) {
      const screenPosition = point.position.clone()
      screenPosition.project(this.camera.orthographicCamera)

      point.element.classList.add('visible')

      // this.raycaster.setFromCamera(screenPosition, this.camera.orthographicCamera)
      // const intersects = this.raycaster.intersectObjects(this.scene.children, true)

      // if(intersects.length === 0) {
      //   point.element.classList.add('visible')
      // } else {
      //   const intersectionDistance = intersects[0].distance
      //   const pointDistance = point.position.distanceTo(this.camera.orthographicCamera.position)

      //   if(intersectionDistance < pointDistance) {
      //     point.element.classList.remove('visible')
      //   } else {
      //     point.element.classList.add('visible')
      //   }
      // }

      const translateX = screenPosition.x * this.sizes.width * 0.5
      const translateY = - screenPosition.y * this.sizes.height * 0.5
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }
  }
}
