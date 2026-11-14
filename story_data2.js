/**
 * STORY_DATA2.JS - Episode 2: Kejuaraan Tingkat Kabupaten
 * v5.0 - Dialogue System, Telegraphed Bosses, Flag-Based Danu
 */

if (typeof GAME_DATA !== 'undefined' && GAME_DATA.episodes) {
  GAME_DATA.episodes.push({
    id: "ep_02_kabupaten",
    title: "Episode 2: Kejuaraan Kabupaten & Intrik Industri",
    synopsis: "Memasuki tingkat Kabupaten, dunia pertarungan bukan lagi sekadar olah napas dan tradisi. Bandar judi, match-fixing, dan petarung modern gaya MMA siap menguji integritas dan ketajaman mentalmu.",
    start_location_id: "loc_06_hotel_kabupaten",

    locations: [
      // ============================================================
      // LOC 06 - HOTEL (DIALOGUE BROTO)
      // ============================================================
      {
        id: "loc_06_hotel_kabupaten",
        name: "Hotel Grand Serayu & Konferensi Pers",
        category: "hub",
        image: "assets/images/scene_hotel.webp",
        narrative: "Lampu kristal menyoroti ballroom Hotel Grand Serayu. Kilatan kamera wartawan dan spanduk raksasa 'Kejuaraan Mutiara Kabupaten' memenuhi ruangan. Kau berdiri di antara nama-nama besar — dan kau tahu, kau bukan siapa-siapa di sini.\n\nSeorang pria berjas mahal — Pak Broto, pengusaha taruhan — mendekatimu dengan seringai yang terlalu lama. Ia menyodorkan koper berisi uang tunai puluhan juta, meminta kau sengaja mengalah di semifinal.",
        narrative_by_flags: {
          ep1_knows_broto: "Lampu kristal menyoroti ballroom. Pak Broto mendekatimu — dan kau mengenali wajahnya dari pasar malam. Pria berjas mahal yang bersandar di mobil hitam. Ia melihat pengakuan di matamu dan tersenyum lebih lebar.\n\n\"Kau sudah tahu siapa aku,\" katanya. \"Bagus. Aku suka orang yang tahu diri. Tiga puluh juta untuk satu ronde kalah. Tidak perlu berdarah-darah.\"",
          ep1_lost_gor: "Lampu kristal menyoroti ballroom. Pak Broto mendekatimu dengan senyum mengasihani. \"Aku melihat pertarunganmu melawan Juara Kecamatan. Kau kalah, tapi kau bertahan sampai ronde terakhir. Itu lebih baik dari yang kubayangkan.\"\n\nIa membuka koper berisi uang. \"Kali ini, mainlah aman. Tiga puluh juta untuk satu ronde kalah.\""
        },
        action_options: [
          {
            action_id: "act_broto_meeting",
            description: "Hadapi Pak Broto dan jawab tawarannya.",
            category: "arena",
            once: true,
            dialogue: {
              npc: "Pak Broto",
              npc_personality: "manipulatif",
              micro_expressions: [
                "Ia menyeringai terlalu lama — satu sisi bibir tertarik sedikit, bukan senyum asli.",
                "Jari telunjuknya mengetuk-ngetuk koper: tiga ketukan. Jeda. Tiga ketukan.",
                "Matanya menyapu dari wajahmu ke tasmu, dan sejenak berhenti di handwrap merah di pergelangan tanganmu."
              ],
              narrative: "Pak Broto membuka koper. Uang bertumpuk rapi, wangi kertas baru. 'Tiga puluh juta, Raka. Hanya untuk satu ronde kalah. Tidakkah kau lelah berjuang keras tanpa hasil?' Ia mendorong koper sedikit ke arahmu. Di seberang ruangan, seorang wartawan mengangkat kamera — mungkin untuk foto, mungkin untuk sesuatu yang lain.",
              options: [
                {
                  action_id: "broto_accept",
                  description: "Mengambil uang dan menutup koper dengan senyum tipis.",
                  is_trap: true,
                  outcome: "Broto tertawa kecil saat kau berbalik. 'Bagus. Ternyata kau bisa dilatih.' Namun ada nada mengejek di ujung kalimatnya. Ia tidak akan menghormatimu — hanya memakai. Di pintu, kau melihat wartawan menurunkan kameranya. Besok, fotomu akan muncul di koran — dengan caption yang tidak kau pilih.",
                  stat_changes: { stat2: -20, stat3: -15 },
                  unlocked_item_id: "item_20",
                  sets_flag: "ep2_accepted_bribe"
                },
                {
                  action_id: "broto_refuse_direct",
                  description: "Menutup koper dengan dua jari, mendorongnya kembali, dan berkata tegas.",
                  outcome: "Mata Broto menyipit sepersekian detik — ekspresi asli sebelum topengnya kembali. 'Kau berani,' katanya pelan. Di seberang ruangan, wartawan itu mengangkat kamera lagi — kali ini pasti untuk fotomu.",
                  stat_changes: { stat2: 10, stat3: 25 },
                  unlocked_item_id: "item_21",
                  sets_flag: "ep2_refused_bribe"
                },
                {
                  action_id: "broto_provoke",
                  description: "Mendekat dan berkata keras, 'Kau takut aku menang bersih, ya, Broto?'",
                  is_trap: true,
                  required_stat: { stat3: 40 },
                  outcome: "Wartawan berbalik. Kamera menyorot. Broto kehilangan senyumnya — ini bukan skenario yang ia bayangkan. Namun di balik senyumnya yang hilang, ada kebencian yang mengeras. Ia tidak akan melupakan ini. Tapi kau juga baru saja membuat dirimu terlihat — untuk baik dan buruk.",
                  stat_changes: { stat2: -5, stat3: 40 },
                  sets_flag: { ep2_refused_bribe: true, broto_humiliated: true }
                },
                {
                  action_id: "broto_silent",
                  description: "Berdiam diri, menatap Broto tanpa ekspresi, dan menunggu ia berbicara lebih dulu.",
                  required_stat: { stat2: 70 },
                  outcome: "Sepuluh detik berlalu. Broto mulai mengetuk kopernya lagi — lebih cepat. Ia tidak tahan dengan diam. 'Baiklah,' katanya akhirnya, 'kau punya keberanian yang mahal. Kita lihat apakah kau bisa mempertahankannya.' Ia menutup koper. Wartawan mencatat, tapi tidak ada foto — kau telah memberi mereka cerita yang lebih tenang, lebih kuat.",
                  stat_changes: { stat2: 15, stat3: 20 },
                  unlocked_item_id: "item_21",
                  sets_flag: "ep2_refused_bribe"
                }
              ]
            },
            next_location_id: "loc_07_gym_modern",
            transition_text: "Kau berjalan keluar dari ballroom. Di koridor hotel, pria-pria berjas lain menatapmu — sebagian dengan hormat, sebagian dengan perhitungan. Kau tahu, di kabupaten ini, reputasi adalah mata uang kedua setelah uang."
          },
          {
            action_id: "act_skip_broto",
            description: "Berpaling dari Broto dan berjalan langsung ke Titan Gym.",
            category: "exploration",
            next_location_id: "loc_07_gym_modern",
            transition_text: "Kau tidak menoleh. Langkahmu cepat, tidak tergesa, tapi jelas. Broto tidak mengejarmu — tapi kau merasakan tatapannya menempel di punggung, seperti jarum yang belum menusuk."
          }
        ]
      },

      // ============================================================
      // LOC 07 - GYM
      // ============================================================
      {
        id: "loc_07_gym_modern",
        name: "Titan Combat Gym",
        category: "hub",
        image: "assets/images/scene_gym.webp",
        rest_available: true,
        narrative: "Dentuman musik elektronik dan dentingan beban besi bergema di Titan Gym. Para atlet dilatih dengan analisis komputer, pengukur detak jantung digital, dan teknik Modern Kickboxing.\n\nDi dinding, layar besar menampilkan rekaman pertarungan legenda MMA. Pelatih gym, pria berotot dengan peluit di lehernya, mendekatimu. 'Kau petarung tradisional, ya? Aku tidak akan mengubah gayamu. Tapi aku bisa mengajarimu membaca pola lawan.'",
        action_options: [
          {
            action_id: "act_belajar_biomekanika",
            description: "Pelajari analisis biomekanika tendangan Kickboxing pada layar simulasi.",
            category: "hub",
            once: true,
            stat_changes: { stat2: 20 },
            unlocked_item_id: "item_22",
            outcome: "Pelatih menunjuk ke layar. 'Lihat titik buta di sini — setiap petarung modern membuka celah ini saat melakukan low-kick. Kalau kau bisa membaca pola ini, kau bisa mengalahkan mereka semua.' Kau mencatat semuanya dengan tangan, bukan dengan HP — pelatih tersenyum melihat itu."
          },
          {
            action_id: "act_beli_handwrap",
            description: "Beli Handwrap Pro Gel dan Suplemen Konsentrat Whey.",
            category: "hub",
            once: true,
            stat_changes: { stat1: 15 },
            unlocked_item_id: "item_23",
            outcome: "Handwrap gel itu dingin di tanganmu, tapi memanas saat dipakai. Pelatih menepuk punggungmu. 'Kau sekarang terlihat seperti petarung modern. Semoga kau masih ingat siapa kau.'"
          },
          {
            action_id: "act_ke_mess",
            description: "Bergerak menuju Mess Atlet Kabupaten.",
            category: "exploration",
            next_location_id: "loc_08_mess_atlet",
            transition_text: "Kau meninggalkan gym saat malam mulai turun. Udara kota kabupaten lebih dingin dari desa — bukan karena cuaca, tapi karena tidak ada yang mengenalmu di sini. Kau hanya satu dari puluhan atlet yang berjuang."
          }
        ]
      },

      // ============================================================
      // LOC 08 - MESS ATLET
      // ============================================================
      {
        id: "loc_08_mess_atlet",
        name: "Mess Atlet & Dapur Nutrisi",
        category: "hub",
        image: "assets/images/scene_mess.webp",
        rest_available: true,
        narrative: "Mess Atlet terasa relatif tenang menjelang malam semifinal. Di dapur mess, rak-rak berisi bubuk protein, madu, dan rempah-rempah tradisional. Beberapa atlet duduk bersila, melakukan peregangan.\n\nDi sudut, seorang pria yang kau kenali duduk sendirian. Danu. Ia tidak lagi memakai seragam padepokan. Wajahnya lebih keras, dan ada bekas luka baru di alisnya.",
        narrative_by_flags: {
          ep1_earned_danu_respect: "Mess Atlet terasa tenang. Danu duduk sendirian di sudut, tapi saat melihatmu, ia tersenyum — senyum pertama yang tulus yang pernah kau lihat darinya. 'Aku menunggumu,' katanya. 'Aku dipecat dari padepokan setelah kalah darimu. Tapi aku tidak menyesal. Aku sekarang bertarung untuk diriku sendiri.'",
          ep1_defeated_danu: "Mess Atlet terasa tenang. Di sudut, seorang pria yang kau kenali duduk sendirian. Danu. Wajahnya lebih keras dari yang kau ingat, dan bekas luka baru di alisnya bercerita tentang pertarungan yang tidak ia menangkan. Ia melihatmu — dan untuk sesaat, ekspresinya berubah.\n\nKau mendengar bisik-bisik: setelah kalah darimu, Danu dipecat dari padepokan. Ia sekarang bertarung untuk siapa pun yang mau membayarnya. Termasuk, mungkin, Broto."
        },
        action_options: [
          {
            action_id: "act_danu_reunion",
            description: "Duduk di samping Danu dan berbicara.",
            category: "hub",
            once: true,
            stat_changes: { stat2: 10 },
            outcome: "Danu menatap cangkir kopinya lama sebelum bicara. 'Eyang tidak mengusirku,' katanya pelan. 'Aku yang pergi. Aku tidak bisa tinggal di tempat yang mengingatkanku bahwa aku bukan yang terbaik.' Ia menatapmu. 'Kau akan bertarung melawan Rangga besok. Dia hewan. Jangan coba-coba adu fisik. Baca dia, bukan hadapi dia.'"
          },
          {
            action_id: "act_latihan_napas",
            description: "Latihan napas dalam di selasar malam mess.",
            category: "hub",
            once: true,
            stat_changes: { stat2: 15 },
            outcome: "Kau duduk bersila di selasar. Kota kabupaten berkilau di kejauhan, jauh dari desa dan padepokan. Untuk sesaat, kau merasakan kesepian yang aneh — tapi juga kelegaan. Di sini, tidak ada yang mengenalmu. Kau hanya dirimu sendiri."
          },
          {
            action_id: "act_ke_semifinal",
            description: "Menuju GOR Utama Kabupaten untuk semifinal.",
            category: "arena",
            next_location_id: "loc_09_arena_kabupaten",
            transition_text: "Kau berjalan ke GOR Utama. Lampu-lampu sorot sudah terlihat dari kejauhan. Ribuan penonton sudah memadati tribun. Di udara, kau bisa merasakan sesuatu yang tidak pernah kau rasakan di kecamatan: ketakutan. Bukan ketakutan akan kalah — tapi ketakutan bahwa kau mungkin tidak bisa pulang dengan kepala tegak."
          }
        ]
      },

      // ============================================================
      // LOC 09 - SEMIFINAL RANGGA
      // ============================================================
      {
        id: "loc_09_arena_kabupaten",
        name: "GOR Utama Mutiara Kabupaten (Semifinal)",
        category: "arena",
        image: "assets/images/scene_gorkab.webp",
        narrative: "Tribun GOR Utama padat oleh ribuan penonton. Di sudut merah berdiri 'Rangga Sang Siku Besi' — petarung bayaran yang terkenal dengan gaya Muay Thai tanpa ampun.\n\nIa menatapmu dari seberang ring. Tidak ada provokasi. Tidak ada senyum. Hanya mata dingin yang sudah melihat banyak lawan tumbang di bawah sikunya.",
        narrative_by_flags: {
          ep2_refused_bribe: "Tribun GOR Utama padat. Rangga menatapmu dengan kebencian murni — bukan kebencian seorang petarung, tapi kebencian seseorang yang dibayar untuk membencimu. 'Kau mempermalukan Broto,' desisnya. 'Aku akan membuatmu menyesal.'",
          ep2_accepted_bribe: "Tribun GOR Utama padat. Rangga menatapmu dengan jijik. 'Jadi kau yang terima suap itu? Dasar anjing. Aku akan menghajarmu sampai kau lupa nama sendiri — dan Pak Broto tidak akan protes.' Rupanya Broto memasang dua kuda: menyuapmu DAN menyewa Rangga."
        },
        action_options: [
          {
            action_id: "act_hadapi_rangga",
            description: "Naik ke ring dan hadapi Rangga Sang Siku Besi.",
            category: "arena",
            once: true,
            required_item_id: "item_22",
            combat: {
              enemy_name: "Rangga Sang Siku Besi",
              enemy_emoji: "💢",
              enemy_stamina: 150,
              enemy_postur: 5,
              enemy_pattern: "BERAT",
              intro: "Rangga memutar bahu kirinya perlahan, seperti melonggarkan sendi. Kaki kanannya mulai menggeser ke depan, tumpuan memusat di bola kaki — posisi siap untuk tendangan rendah. Napasnya keluar pendek, dua kali, sebelum masuk panjang. Ia tidak akan membiarkanmu membaca dia.",
              rounds: [
                {
                  round: 1,
                  telegraph: "Rangga memutar bahu kirinya perlahan, seperti melonggarkan sendi. Namun matanya tidak berkedip dari arah lutut kananmu. Kaki kanannya mulai menggeser ke depan, tumpuan memusat di bola kaki — posisi siap untuk tendangan rendah (low kick). Napasnya keluar pendek, dua kali, sebelum masuk panjang.",
                  options: [
                    {
                      label: "Menarik kaki kanan, memutar pinggul ke kiri, dan menghadirkan siku untuk menangkis tulang kering.",
                      outcome: "Tulang kering Rangga menghantam ujung siku Anda. Bunyi berdebam — bukan tulang Anda yang bergetar, tapi tulang kakinya. Ia menyeringai menahan sakit dan melompat mundur. Anda memenangkan momentum.",
                      effects: { player_stamina: -5, player_qi: -3, enemy_postur: -3, player_momentum: 1 }
                    },
                    {
                      label: "Menerjang lurus dengan kombinasi hook kiri-kanan, mengandalkan kecepatan.",
                      outcome: "Tendangan rendah Rangga mendarat lebih dulu di betis kanan Anda. Bunyi 'BRAK' memenuhi GOR. Kaki Anda lemas, dan Anda terjatuh ke satu lutut di hadapan sang juara.",
                      effects: { player_stamina: -22, player_postur: -1 },
                      debuff: { name: "Kaki Gemetar" }
                    },
                    {
                      label: "Berpura-pura goyah di kaki kiri, membiarkan bahu kanan terbuka — undang tendangan. Lalu melesat ke samping.",
                      required_stat: { stat2: 55 },
                      outcome: "Rangga termakan umpan. Tendangannya meluncur ke arah kosong saat Anda sudah berputar ke belakangnya. Dengan satu dorongan punggung, ia terhuyung ke tali ring. Penonton bersorak melihat juara mereka goyah.",
                      effects: { player_qi: -8, enemy_postur: -4, player_momentum: 2 }
                    }
                  ]
                },
                {
                  round: 2,
                  telegraph: "Rangga tidak lagi tersenyum. Kini ia memasang kuda-kuda Muay Thai klasik: kaki depan ringan, kaki belakang jadi tumpuan utama. Siku kanannya terangkat sedikit, dan bahu kirinya berputar ke depan. Ini pola serangan siku terbang — ia ingin mematahkan pertahananmu dengan satu hantaman brutal.",
                  options: [
                    {
                      label: "Mundur selangkah, angkat kedua lengan tinggi, dan biarkan siku kirinya menghantam pelindung lengan.",
                      outcome: "Siku Rangga menghantam lenganmu. Rasanya seperti ditabrak motor. Tapi lenganmu menahan. Saat ia mendarat, kau sudah meluncurkan pukulan lurus pendek ke hidungnya. Darah mengalir.",
                      effects: { player_stamina: -10, player_qi: -3, enemy_stamina: -4, enemy_postur: -2 }
                    },
                    {
                      label: "Menerjang masuk saat ia melompat, mengandalkan kecepatan untuk memukul duluan.",
                      outcome: "Siku Rangga menghantam pelipismu. Dunia berputar. Kau mendengar suara wasit menghitung dari kejauhan, dan suara Broto tertawa dari tribun. Kau terjatuh, tapi masih sadar.",
                      effects: { player_stamina: -25, player_postur: -1 },
                      debuff: { name: "Pelipis Berdarah" }
                    },
                    {
                      label: "Bersiap menangkap kakinya saat mendarat, lalu membantingnya ke kanvas.",
                      required_stat: { stat2: 60 },
                      outcome: "Siku Rangga menghantam lenganmu, tapi kau sudah menangkap kakinya yang mendarat. Satu putaran pinggul, dan kau membantingnya ke kanvas. Tubuh besar itu menghantam lantai dengan bunyi menggelegar. Penonton histeris.",
                      effects: { player_qi: -10, enemy_stamina: -10, enemy_postur: -3, player_momentum: 1 }
                    }
                  ]
                },
                {
                  round: 3,
                  telegraph: "Rangga berdiri tegak. Napasnya memburu, tapi matanya masih tajam. Ia mengangkat tangan kanan tinggi — terlalu tinggi untuk pukulan biasa. Ini bukan lagi teknik. Ini pukulan pamungkas dari petarung yang sudah kehabisan akal: hook kanan terbuka lebar, mengandalkan kekuatan bukan akurasi.",
                  options: [
                    {
                      label: "Mundur, biarkan hook meleset, lalu melancarkan pukulan lurus pendek ke dagu.",
                      outcome: "Hook-nya meleset. Kau mundur dengan tenang, dan saat ia terhuyung karena momentum, pukulan lurusmu menghantam dagunya. Rangga jatuh ke kanvas. Wasit menghitung. Sepuluh.",
                      effects: { player_qi: -3, enemy_stamina: -15, enemy_postur: -3 }
                    },
                    {
                      label: "Maju masuk, tangkap lengannya, dan coba kunci dengan siku.",
                      outcome: "Hook-nya menghantam bahumu, dan lenganmu kaku. Kau mencoba mengunci, tapi Rangga terlalu kuat. Ia membalikkan tubuhmu dan melancarkan serangan balik. Kau terlempar ke tali ring.",
                      effects: { player_stamina: -18, player_postur: -1 }
                    },
                    {
                      label: "Berdiri tegak, tatap matanya, dan beri isyarat agar ia menyerang dengan seluruh tenaga.",
                      required_stat: { stat2: 70 },
                      outcome: "Kau membuka tangan, mempersilakan. Rangga menyerang dengan seluruh tenaga — hook kanan yang mematikan. Tapi kau sudah membaca arahnya. Satu langkah ke samping, satu putaran pinggul, dan siku kananmu menghantam rahangnya. Ia jatuh tak sadarkan diri.",
                      effects: { player_qi: -6, enemy_stamina: -20, enemy_postur: -4 }
                    }
                  ]
                }
              ],
              victory: {
                outcome: "Rangga tumbang! Wasit mengangkat tanganmu. Di tribun, kau melihat Broto berdiri dan berjalan keluar dengan wajah gelap. Dan di sudut lain, kau melihat Danu tersenyum — senyum pertama yang tulus dari senior yang pernah kau kalahkan.",
                stat_changes: { stat3: 25 },
                sets_flag: "ep2_defeated_rangga",
                next_location_id: "loc_10_final_kabupaten"
              },
              defeat: {
                outcome: "Kau terkapar di kanvas. Rangga berdiri di atasmu, mengangkat tangan ke tribun. Sorak penonton memekakkan telinga. Tapi di sudut, kau melihat Danu berdiri, mengepalkan tangan. Ia tidak menyorakimu — tapi ia tidak pergi. Untuk sesaat, kau merasa tidak sendirian.",
                stat_changes: { stat1: -30, stat3: -10 },
                sets_flag: "ep2_lost_semifinal"
              }
            }
          },
          {
            action_id: "act_serang_membabi_buta",
            description: "Menerjang tanpa pertahanan sama sekali (BERBAHAYA).",
            category: "arena",
            stat_changes: { stat1: -60, stat2: -20 },
            outcome: "Kau menerjang tanpa perhitungan. Siku keras Rangga mendarat di pelipismu. Kau tergeletak tidak sadarkan diri di atas kanvas. Semifinal berakhir dengan kekalahan telak.",
            sets_flag: "ep2_lost_semifinal"
          }
        ]
      },

      // ============================================================
      // LOC 10 - FINAL BIMA
      // ============================================================
      {
        id: "loc_10_final_kabupaten",
        name: "Ring Utama Final Kejuaraan Kabupaten",
        category: "arena",
        image: "assets/images/scene_finalkab.webp",
        narrative: "Sorot lampu stroboskopik membakar atmosfer Ring Final. Lawan terakhir: Bima 'Sang Hitam' — juara bertahan Kickboxing Kabupaten tiga kali berturut-turut yang tak pernah kalah.\n\nBima membuka dengan kombinasi pukulan cepat dan low-kick beruntun. Seluruh stadion menahan napas menunggu pergerakanmu.",
        action_options: [
          {
            action_id: "act_hadapi_bima",
            description: "Hadapi Bima Sang Hitam di final kabupaten.",
            category: "arena",
            once: true,
            required_stat: { stat2: 50 },
            combat: {
              enemy_name: "Bima Sang Hitam",
              enemy_emoji: "🖤",
              enemy_stamina: 180,
              enemy_postur: 5,
              enemy_pattern: "CEPA T",
              intro: "Bima melangkah ke tengah ring dengan langkah ringan, seperti penari. Ia tidak memasang kuda-kuda — ia hanya berdiri, tangan menggantung rileks. Namun matanya mengamati setiap inci tubuhmu. Ini petarung yang sudah melihat semuanya.",
              rounds: [
                {
                  round: 1,
                  telegraph: "Bima menggeser berat badannya ke kaki belakang — sedikit saja, hampir tidak terlihat. Tapi matanya turun ke betis kirimu. Kaki depannya terangkat sedikit, siap melancarkan tendangan rendah. Ia menguji reflex-mu dulu sebelum menunjukkan yang sebenarnya.",
                  options: [
                    {
                      label: "Angkat kaki kiri, tangkis tendangan dengan tulang kering, dan biarkan kakinya memantul.",
                      outcome: "Tulang keringmu menangkis tendangannya. Bima tersenyum tipis — bukan senyum mengejek, tapi senyum seseorang yang baru menemukan lawan yang layak. 'Bagus,' katanya pelan. 'Berarti ini tidak akan membosankan.'",
                      effects: { player_stamina: -3, enemy_postur: -2 }
                    },
                    {
                      label: "Mundur menjauh dan tunggu kesempatan.",
                      outcome: "Kau mundur, tapi tendangan rendahnya tetap menghantam betis kananmu. Tidak telak, tapi cukup untuk membuat kaki kananmu terasa berat.",
                      effects: { player_stamina: -12 }
                    },
                    {
                      label: "Berpura-pura tidak siap, biarkan ia menendang, lalu tangkap kakinya di detik terakhir.",
                      required_stat: { stat2: 60 },
                      outcome: "Kau berpura-pura lengah. Bima termakan — ia melancarkan tendangan lebih keras dari yang seharusnya. Kau menangkap kakinya, memutar pinggul, dan mendorongnya ke tali ring. Penonton bersorak.",
                      effects: { player_qi: -8, enemy_postur: -3 }
                    }
                  ]
                },
                {
                  round: 2,
                  telegraph: "Bima tidak lagi menguji. Kali ini ia benar-benar menyerang: kaki kanan melangkah jauh ke depan, pinggul berputar, tangan kiri terangkat untuk menutup wajah. Ini bukan tendangan rendah — ini high kick yang mengincar pelipismu. Kekuatannya bisa mematikan.",
                  options: [
                    {
                      label: "Mundur satu langkah, angkat lengan kiri untuk menangkis, dan biarkan kakinya melintas di atas.",
                      outcome: "Kakinya melintas di atas pelipismu, tapi lengan kirimu menahan sebagian kekuatan. Kau merasakan getaran sampai ke gigi. Bima mendarat dengan ringan. 'Kau kuat,' katanya. 'Tapi belum cukup.'",
                      effects: { player_stamina: -8, enemy_postur: -1 }
                    },
                    {
                      label: "Bungkuk dan terobos masuk untuk memukul badannya.",
                      outcome: "Kau bungkuk untuk menerobos, tapi kakinya menghantam bahumu. Kekuatannya luar biasa. Kau terjatuh, berguling ke tali ring.",
                      effects: { player_stamina: -24, player_postur: -1 },
                      debuff: { name: "Telinga Berdenging" }
                    },
                    {
                      label: "Menunggu tendangan, membaca arah, lalu melangkah memutar ke punggungnya.",
                      required_stat: { stat2: 65 },
                      outcome: "Kakinya melintas di atasmu saat kau sudah berputar ke belakangnya. Kau mendorong punggungnya — ia tersandung ke tali ring. Penonton bersorak histeris: juara mereka goyah!",
                      effects: { player_qi: -10, enemy_postur: -3, player_momentum: 1 }
                    }
                  ]
                },
                {
                  round: 3,
                  telegraph: "Bima menghela napas panjang. Ia memasang kuda-kuda rendah, kedua tangan rapat di depan wajah. Kaki depannya jinjit. Ini bukan lagi gaya Kickboxing — ini kombinasi MMA: ia akan mencoba menangkap kakimu, menjatuhkanmu, lalu menghabisi di lantai. Ini teknik yang tidak kau pelajari di padepokan.",
                  options: [
                    {
                      label: "Jaga jarak, tetap di kaki, dan pukul kepalanya setiap kali ia mencoba mendekat.",
                      outcome: "Bima mengulurkan tangan untuk menangkap kakimu, tapi setiap kali ia mendekat, pukulan lurusmu menghantam wajahnya. Ia mundur, mengusap pipi yang mulai bengkak. 'Kau belajar cepat,' katanya.",
                      effects: { player_stamina: -5, enemy_stamina: -5, enemy_postur: -2 }
                    },
                    {
                      label: "Biarkan ia menangkap kaki, lalu gulingkan badannya dengan teknik gym.",
                      required_stat: { stat2: 55 },
                      outcome: "Bima menangkap kakimu — dan tersenyum, mengira kau sudah kalah. Tapi kau sudah belajar di Titan Gym: satu putaran pinggul, satu dorongan, dan tiba-tiba Bima terjatuh ke punggungnya. Penonton terkesiap.",
                      effects: { player_qi: -12, enemy_stamina: -15, enemy_postur: -3 }
                    },
                    {
                      label: "Terima takedown, tapi coba kunci lehernya dari bawah.",
                      outcome: "Kau terjatuh ke kanvas. Bima langsung menduduki dadamu dan menghantam wajahmu berkali-kali sebelum wasit menghentikan. Kau melihat bintang. Tapi kau masih sadar.",
                      effects: { player_stamina: -22, player_postur: -2 },
                      debuff: { name: "Pelipis Berdarah" }
                    }
                  ]
                },
                {
                  round: 4,
                  telegraph: "Bima berdiri tiga langkah di hadapanmu. Ia tidak menyerang. Ia hanya menatap, dan kau melihat sesuatu di matanya yang belum pernah kau lihat sebelumnya: kelelahan. Kaki kanannya sedikit gemetar. Ia mengangkat tangan kanan — tinggi, terlalu tinggi — dan kau tahu, ini pukulan pamungkas. Hook kanan dengan seluruh sisa tenaganya.",
                  options: [
                    {
                      label: "Berdiri tegak, tatap matanya, dan beri isyarat agar ia menyerang dengan seluruh tenaga.",
                      required_stat: { stat2: 70 },
                      outcome: "Kau membuka tangan, mempersilakan. Bima menyerang dengan seluruh tenaga — hook kanan yang mematikan. Tapi kau sudah membaca arahnya. Satu langkah ke samping, satu putaran pinggul, dan siku kananmu menghantam rahangnya. Ia jatuh tak sadarkan diri.",
                      effects: { player_qi: -6, enemy_stamina: -25, enemy_postur: -5 }
                    },
                    {
                      label: "Mundur, biarkan hook-nya meleset, lalu balas dengan kombinasi pukulan.",
                      outcome: "Hook-nya meleset. Kau mundur dengan tenang, dan saat ia terhuyung karena momentum, kombinasi pukulanmu masuk. Pukulan kiri ke badan, pukulan kanan ke dagu. Bima jatuh ke kanvas.",
                      effects: { player_stamina: -8, enemy_stamina: -15, enemy_postur: -2 }
                    },
                    {
                      label: "Maju masuk, tangkap lengannya, dan coba banting dia ke kanvas.",
                      outcome: "Hook-nya menghantam bahumu. Kau terjatuh ke kanvas, dan Bima langsung melompat ke atas. Wasit menghentikan pertarungan. Kau kalah angka.",
                      effects: { player_stamina: -30 }
                    }
                  ]
                }
              ],
              victory: {
                outcome: "Bima tidak bangkit. Wasit mengangkat tanganmu. Sabuk Emas Kejuaraan Kabupaten dilingkarkan di pinggangmu. Sorak ribuan penonton mengiringi kemenangan bersihmu. Kau melihat Eyang Suryo di tribun — ia mengangguk, dan kau melihat air mata di matanya.",
                trigger_ending_id: "true_ending_kabupaten"
              },
              defeat: {
                outcome: "Kau terkapar di kanvas. Bima berdiri di atasmu, mengangkat tangannya ke tribun. Kekalahan ini berat — tapi saat kau bangkit, kau melihat Danu di tepi ring. Ia mengangguk. 'Kau sudah bertarung lebih keras dari yang kubayangkan,' katanya.",
                stat_changes: { stat1: -25, stat3: -5 },
                trigger_ending_id: "lost_final_ending"
              }
            }
          },
          {
            action_id: "act_kalah_sengaja",
            description: "Mengalah sengaja sesuai skenario suap Pak Broto.",
            category: "arena",
            once: true,
            trigger_ending_id: "corrupt_ending"
          }
        ]
      }
    ],

    // ============================================================
    // ITEMS
    // ============================================================
    items: [
      { id: "item_20", name: "Koper Uang Suap Bandar", emoji: "💼", category: "bukti", description: "Uang hasil kecurangan yang merusak kehormatan petarung." },
      { id: "item_21", name: "Sertifikat Integritas Publik", emoji: "📜", category: "bukti", description: "Bukti penolakan suap yang meningkatkan kepercayaan sponsor." },
      { id: "item_22", name: "Catatan Biomekanika Kickboxing", emoji: "📊", category: "kitab", description: "Analisis teknis titik lemah gaya pertarungan modern." },
      { id: "item_23", name: "Handwrap Pro Gel Modern", emoji: "🥊", category: "peralatan", description: "Pelindung tangan kelas profesional untuk daya rusak maksimal." }
    ],

    // ============================================================
    // RECIPES
    // ============================================================
    recipes: [
      {
        recipe_id: "rec_hibrida",
        result_item_name: "Formula Nutrisi Atlet Hibrida",
        priority: 1,
        required_categories: { herbal: 1, peralatan: 1 },
        description: "Menggabungkan Jahe Merah Tradisional & Gel Pro untuk memulihkan 40 Stamina!",
        reward_stat_changes: { stat1: 40 }
      },
      {
        recipe_id: "rec_jurus_konter_modern",
        result_item_name: "Analisis Titik Buta Modern",
        priority: 1,
        required_item_ids: ["item_22", "item_23"],
        description: "Membuka kelemahan Rangga permanen. (Shortcut, bukan gate).",
        reward_stat_changes: { stat2: 15, stat1: 10 }
      }
    ],

    // ============================================================
    // ENDINGS
    // ============================================================
    endings: {
      true_ending_kabupaten: {
        title: "TRUE ENDING: Sabuk Kejuaraan Kabupaten & Seleksi Provinsi",
        narrative: "Sabuk Emas Kejuaraan Kabupaten dilingkarkan di pinggangmu! Sorak ribuan penonton mengiringi kemenangan bersihmu. Dengan memadukan ketahanan tradisi Sumbu Jagat dan pemahaman analisis modern, nama kau kini resmi tercatat dalam daftar Atlet Pilihan menuju KEJUARAAN PROVINSI!\n\nEyang Suryo menyalami kau di tepi ring. \"Kau bukan lagi murid yang aku kenal saat bersujud di tikar,\" katanya pelan. \"Kau petarung. Dan petarung sejati tidak pernah kehilangan arah, meski menang.\""
      },
      lost_final_ending: {
        title: "ENDING: Kekalahan Angka di Final Kabupaten",
        narrative: "Kau kalah angka dari Bima. Sorak penonton bukan untukmu, tapi kau tetap berdiri. Di ruang ganti, Danu menunggumu. Ia tidak bicara banyak — hanya meletakkan handwrap lusuh di bangkumu. \"Kesempatan kedua tidak datang dari liga,\" katanya. \"Ia datang dari dirimu sendiri.\"\n\nKau belum juara. Tapi kau belum selesai."
      },
      corrupt_ending: {
        title: "BAD ENDING: Skandal Suap Match-Fixing",
        narrative: "Skandal pengusutan suap meledak di media massa. Nama baikmu dicabut, gelar juara dibatalkan, dan kau dilarang bertanding di seluruh gelanggang resmi seumur hidup. Di desa, nenekmu tidak pernah bertanya. Ia hanya menatap handwrap merah di meja, dan tidak berkata apa-apa. Itu lebih menyakitkan dari apa pun."
      },
      stat_zero_ending: {
        title: "BAD ENDING: Cedera Permanen & Karir Berakhir",
        narrative: "Tubuhmu tidak mampu lagi menerima tekanan pertarungan level kabupaten. Dokter menyatakan kau tidak boleh naik ring lagi. Mimpi petarung berakhir di rumah sakit — tapi di luar jendela, Danu menunggu. Ia tidak masuk. Ia hanya berdiri di sana, memastikan kau tidak sendirian."
      },
      stat3_zero_ending: {
        title: "BAD ENDING: Nama Baik Hancur di Industri",
        narrative: "Reputasimu mencapai titik terendah. Tidak ada promotor yang mau bekerja sama, tidak ada sponsor yang mau mendanai. Kau menghilang dari dunia petarung tanpa jejak — dan di desa, hanya nenek yang masih menunggu kau pulang."
      }
    }
  });
}