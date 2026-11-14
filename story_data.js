/**
 * STORY_DATA.JS - Episode 1: Ujian Padepokan & Gelanggang Kecamatan
 * v5.0 - Telegraphed Combat, Postur/Momentum/Celah Emas, Jurus System
 */

const GAME_DATA = {
  game_title: "LIGA PETARUNG",
  theme_colors: {
    bg: "#121318",
    panel: "#1c1e26",
    accent: "#d97706",
    text: "#f3f4f6"
  },
  stats_config: {
    stat1: { name: "Stamina", icon: "🥊", initial: 100, max: 100 },
    stat2: { name: "Qi", icon: "🧘", initial: 80, max: 100 },
    stat3: { name: "Reputasi", icon: "🏆", initial: 20, max: 100 }
  },
  audio_config: {
    bgm: "assets/audio/bgm_arena.mp3",
    sfx_action: "assets/audio/sfx_klik.mp3",
    sfx_danger: "assets/audio/sfx_tegang.mp3"
  },
  episodes: [{
    id: "ep_01_padepokan_kecamatan",
    title: "Episode 1: Ujian Padepokan & Gelanggang Kecamatan",
    synopsis: "Sebagai murid yang diremehkan di Padepokan Sumbu Jagat, buktikan kemampuan olah napas dan fisik untuk meraih tiket wakil kecamatan.",
    start_location_id: "loc_00_rumah",

    locations: [
      // ============================================================
      // LOC 00 - RUMAH NENEK
      // ============================================================
      {
        id: "loc_00_rumah",
        name: "Rumah Tua di Tepi Desa",
        category: "hub",
        image: "assets/images/scene_padepokan.webp",
        rest_available: true,
        narrative: "Subuh masih gelap saat kau mengikat tali sepatu butut di beranda rumah panggung warisan nenek. Uap hangat dari teh tubruk yang ia seduh mengambang di udara — satu-satunya kehangatan yang kau punya sebelum meninggalkan desa ini.\n\n\"Raka,\" panggilnya pelan, tangannya yang berkerut menyerahkan sepotong kain merah lusuh. \"Ini handwrap ayahmu. Ia tidak pernah menang di ring — tapi ia tidak pernah pulang dengan punggung membungkuk. Ingat itu.\"",
        action_options: [
          {
            action_id: "act_terima_handwrap",
            description: "Menerima handwrap ayah dari tangan nenek.",
            category: "hub",
            once: true,
            unlocked_item_id: "item_00",
            outcome: "Kau membungkus kain itu erat di pergelangan tangan kanan. Nenek tersenyum, lalu berbalik masuk ke rumah tanpa berkata lagi. Kau tahu ia menahan tangis.",
            sets_flag: "ep1_has_father_wrap"
          },
          {
            action_id: "act_berangkat",
            description: "Berjalan menyusuri jalan setapak menuju Padepokan Sumbu Jagat.",
            category: "exploration",
            next_location_id: "loc_01_padepokan",
            transition_text: "Kabut subuh mengikuti langkahmu sepanjang jalan setapak berbatu. Sawah masih diam, hanya suara katung yang menyambut. Setiap langkah membawa kau lebih jauh dari rumah — lebih dekat ke sesuatu yang kau sendiri belum tahu bentuknya.\n\nSaat gerbang Padepokan Sumbu Jagat muncul di kejauhan, dadamu berdebar. Bukan karena gugup. Karena kau sadar: mulai detik ini, kau tidak bisa pulang dengan tangan kosong."
          }
        ]
      },

      // ============================================================
      // LOC 01 - PADEPOKAN (HUB)
      // ============================================================
      {
        id: "loc_01_padepokan",
        name: "Ruang Utama Padepokan Sumbu Jagat",
        category: "hub",
        image: "assets/images/scene_padepokan.webp",
        rest_available: true,
        narrative: "Aroma kemenyan tipis mengepul dari anglo di sudut ruangan, bercampur bau keringat dan minyak serai yang sudah bertahun-tahun meresap ke dinding kayu jati. Di atas lantai yang licin mengilap, kau berdiri — murid paling tidak dikenal di Padepokan Sumbu Jagat.\n\nEyang Suryo duduk bersila di tikar pandan, punggung setegak tombak meski usia sudah senja. Matanya setengah terpejam, tapi kau tahu ia mengamati setiap tarikan napasmu. Di ambang pintu, Danu bersandar dengan tangan menyilang. \"Murid kesayangan tidak akan datang menjemputmu,\" katanya tanpa menatap. \"Kau yang harus datang pada mereka.\"",
        action_options: [
          {
            action_id: "act_bersujud_eyang",
            description: "Bersujud memohon restu Eyang Suryo.",
            category: "hub",
            once: true,
            unlocked_item_id: "item_01",
            unlock_jurus_id: "jurus_siku_penangkis",
            stat_changes: { stat2: 8 },
            sets_flag: "ep1_has_blessing",
            outcome: "Eyang membuka mata. Tatapannya tidak lagi kabur oleh usia. \"Kau bukan yang terkuat, bukan yang tercepat. Tapi kau satu-satunya yang berani bersujud tanpa mengharap balasan.\" Ia menyodorkan kitab tipis. \"Baca ini. Jangan dihafal — diresapi.\" Kau juga belajar gerakan Siku Penangkis dan Tapak Terbuka dari gerakan tangannya yang pelan."
          },
          {
            action_id: "act_eyang_lore",
            description: "Bertanya pada Eyang tentang asal-usul Sumbu Jagat.",
            category: "hub",
            once: true,
            stat_changes: { stat2: 5 },
            outcome: "Eyang tersenyum tipis. \"Sumbu Jagat bukan nama. Ia cara pandang. Sumbu — poros — yang tidak bergerak meski dunia berputar. Kau akan mengerti nanti, saat ring sudah mulai memanggil namamu.\""
          },
          {
            action_id: "act_ke_pelataran",
            description: "Menuju pelataran untuk latihan fisik dan menghadapi Danu.",
            category: "exploration",
            next_location_id: "loc_02_pelataran",
            transition_text: "Kau melangkah keluar dari ruang utama. Kemenyan berubah menjadi bau tanah dan seng panas. Di pelataran, sinar matahari sore menyorot sandbag yang bergoyang pelan. Beberapa murid junior berhenti berlatih saat melihatmu — bukan karena hormat, tapi karena ingin melihat apakah kau akan dipermalukan hari ini."
          },
          {
            action_id: "act_ke_dapur",
            description: "Menuju Dapur Herbal untuk belajar meracik jamu.",
            category: "exploration",
            next_location_id: "loc_03_dapur",
            transition_text: "Di ujung koridor padepokan, pintu dapur berderit. Aroma rimpang dan madu menyambutmu — lebih hangat daripada ruang utama. Mbok Sri sedang menumbuk jahe. Ia mengangguk pelan saat melihatmu."
          }
        ]
      },

      // ============================================================
      // LOC 02 - PELATARAN (COMBAT DANU)
      // ============================================================
      {
        id: "loc_02_pelataran",
        name: "Pelataran Sandbag & Ring Terbuka",
        category: "exploration",
        image: "assets/images/scene_pelataran.webp",
        narrative: "Sinar matahari sore menembus celah atap seng. Sandbag kulit seberat lima puluh kilogram bergoyang ditiup angin. Di sinilah para murid mengasah ketajaman serangan.\n\nDanu melangkah mendekat sambil memutar handwrap di tangannya. Ia berhenti tiga langkah di hadapanmu, mengetuk dagunya dua kali dengan telunjuk. \"Kalau kau memang sehebat yang dikatakan Eyang, buktikan di ring ini.\"",
        action_options: [
          {
            action_id: "act_hadapi_danu",
            description: "Naik ke ring dan hadapi Danu dalam uji tanding.",
            category: "arena",
            once: true,
            combat: {
              enemy_name: "Danu",
              enemy_emoji: "🥋",
              enemy_stamina: 80,
              enemy_postur: 5,
              enemy_pattern: "CEPA T",
              intro: "Danu memasang kuda-kuda tinggi — gaya modern, bukan Sumbu Jagat. Ia ingin menunjukkan bahwa padepokan ini tidak lagi hanya milik orang-orang tua. Beberapa murid junior menahan napas, menonton dari tepi ring.",
              rounds: [
                {
                  round: 1,
                  telegraph: "Bahu kanan Danu menegang. Matanya melirik cepat ke arah rusuk kirimu yang terbuka, sementara kaki kirinya digeser ke belakang untuk memusatkan tumpuan. Napasnya keluar pendek — tanda ia akan melesat cepat, bukan memukul keras.",
                  options: [
                    {
                      label: "Membaca tarikan bahu, melangkah ke samping, dan menaikkan siku untuk menangkis.",
                      outcome: "Kau melangkah ke samping tepat saat Danu melesat. Hook-nya hanya menyayat udara. Siku kirimu menyentuh rusuknya sebagai peringatan — cukup untuk membuatnya mundur sejengkal dan menatapmu dengan mata berbeda.",
                      effects: { player_qi: -2, enemy_postur: -1, player_momentum: 1 }
                    },
                    {
                      label: "Mengunci siku kanan, menangkis hook di tengah jalannya.",
                      outcome: "Siku kananmu menahan hook-nya tepat di tengah. Tidak ada yang cedera, tapi kau tahu ritme ini: ia lebih cepat, kau lebih kokoh. Pertarungan akan panjang.",
                      effects: { player_qi: -3, enemy_postur: -1 }
                    },
                    {
                      label: "Menerjang lurus dengan tapak terbuka sebelum dia bergerak.",
                      outcome: "Kau menerjang — tapi dia membaca. Tapak kirimu menghantam sebagian, hook kanannya menyentuh rahangmu. Kau mundur satu langkah, gigi berdecit.",
                      effects: { player_stamina: -6, enemy_stamina: -2 }
                    }
                  ]
                },
                {
                  round: 2,
                  telegraph: "Bahu kanan Danu kembali menegang — gerakan yang sama. Namun kali ini dagunya diketuk dua kali dengan telunjuk. Ia mengira kau belum membaca polanya. Kakinya sedikit gemetar karena postur yang belum pulih dari ronde pertama.",
                  options: [
                    {
                      label: "Baca kebiasaan. Geser lagi, tepat saat ia melesat.",
                      outcome: "Kau geser untuk kedua kalinya. Danu mengumpat — kakinya tersandung sendiri karena momentum yang tak tersalurkan. Posturnya terhuyung jauh. Kau melihat celah lebar.",
                      effects: { player_qi: -2, enemy_postur: -3, player_momentum: 1 },
                      sets_flag: "danu_offbalance"
                    },
                    {
                      label: "Tangkap momentum. Siku kiri ke dagunya yang terbuka.",
                      outcome: "Siku kirimu menghantam dagunya dari samping. Kepalanya tersentak, matanya membelalak. Ia tidak menyangka kau bisa secepat itu.",
                      effects: { player_qi: -3, enemy_postur: -2 }
                    },
                    {
                      label: "Tetap tenang. Napas dalam, kumpulkan Qi.",
                      outcome: "Kau menarik napas panjang. Danu tidak menyerang — ia juga mengambil jeda. Untuk sesaat, ring sepi dari gerakan. Keduanya menimbang.",
                      effects: { player_qi: 8 }
                    }
                  ]
                },
                {
                  round: 3,
                  telegraph: "Danu menghela napas. Bahunya sedikit turun. Ada keputusasaan di langkah kakinya yang kini lebih berat. Namun tangan kanannya masih terangkat — siap melancarkan hook pamungkas, atau menyerah dengan hormat. Matanya berkata: 'Apa yang akan kau pilih?'",
                  options: [
                    {
                      label: "Habisi dengan siku penangkis — akhiri sekarang.",
                      outcome: "Kau melangkah masuk. Siku kananmu menghantam dagunya dari dalam. Danu jatuh ke satu lutut, tangan menahan kanvas. Ia mengangkat tangan — menyerah.",
                      effects: { player_qi: -3, enemy_stamina: -15, enemy_postur: -3 }
                    },
                    {
                      label: "Berhenti. Turunkan tangan. Mengangguk hormat pada seniormu.",
                      outcome: "Kau menurunkan tangan. Danu tertegun — lalu tertawa kecil, tawa pertama yang pernah kau dengar darinya. \"Kau bukan yang terkuat,\" katanya pelan, \"tapi kau tidak menyilaukan mata dengan amarah. Aku bisa belajar dari itu.\" Ia melepas handwrapnya dan menyerahkannya padamu.",
                      effects: { enemy_stamina: -999 },
                      sets_flag: "ep1_earned_danu_respect"
                    },
                    {
                      label: "Beri dia celah — biarkan dia menyerang pamungkas dulu.",
                      outcome: "Kau menurunkan tangan setengah. Danu menerjang — hook kanan selebar-lebarnya. Kau sudah membaca. Satu langkah mundur, dan hook itu hanya menyentuh udara. Ia terhuyung ke tali ring, kehabisan tenaga.",
                      effects: { player_stamina: -3, enemy_stamina: -8, enemy_postur: -2 }
                    }
                  ]
                }
              ],
              victory: {
                outcome: "Pertarungan usai. Kau masih berdiri. Pelataran sunyi — lalu murid junior bertepuk tangan. Danu, meski masih terengah, mengangkat tangannya untuk memberi hormat. Sesuatu berubah di padepokan ini.",
                stat_changes: { stat3: 15 },
                unlocked_item_id: "item_04",
                sets_flag: "ep1_defeated_danu"
              },
              defeat: {
                outcome: "Kau terkapar di lantai kayu. Danu berdiri di atasmu, napasnya juga memburu. \"Belum cukup,\" katanya — bukan dengan ejekan, tapi dengan suara senior yang mengingatkan. \"Tapi kau tidak buruk. Coba lagi nanti.\"",
                stat_changes: { stat1: -15, stat3: -5 },
                sets_flag: "ep1_lost_to_danu"
              }
            }
          },
          {
            action_id: "act_latihan_sandbag",
            description: "Berlatih memukul sandbag hingga buku jari memerah.",
            category: "hub",
            once: true,
            stat_changes: { stat1: -3, stat2: 5 },
            outcome: "Kau memukul sandbag hingga lengan serasa lumpuh. Tapi di sela-sela rasa sakit itu, kau merasakan ritme — tarikan otot, dorongan pinggul, hembusan napas. Tubuhmu mulai mengingat sesuatu yang belum pernah diajarkan."
          },
          {
            action_id: "act_kembali_padepokan",
            description: "Kembali ke ruang utama Padepokan.",
            category: "hub",
            next_location_id: "loc_01_padepokan",
            transition_text: "Kau melangkah kembali ke dalam padepokan saat senja mulai turun. Bau kemenyan menyambut, seperti pelukan yang tidak pernah kau minta tapi selalu kau butuhkan."
          }
        ]
      },

      // ============================================================
      // LOC 03 - DAPUR HERBAL
      // ============================================================
      {
        id: "loc_03_dapur",
        name: "Dapur Herbal & Racikan Jamu",
        category: "hub",
        image: "assets/images/scene_dapur.webp",
        rest_available: true,
        narrative: "Dapur padepokan dipenuhi kuali perunggu berasap tipis. Rimpang jahe merah, kunyit tua, dan dedaunan kering tergantung di papan kayu. Di rak bawah, botol-botol madu hutan dan minyak urut tertata rapi.\n\nDi dinding, catatan tua Eyang: \"Yang pahit menyembuhkan luka. Yang manis memberi tenaga. Yang licin melindungi sendi.\" — sepertinya petunjuk untuk murid yang mau belajar meracik. Mbok Sri, perempuan tua penjaga dapur, tersenyum melihatmu membaca.",
        action_options: [
          {
            action_id: "act_ambil_bahan_jamu",
            description: "Mengambil Jahe Merah, Kunyit Tua, dan Madu Hutan dari rak kayu.",
            category: "hub",
            once: true,
            unlocked_item_ids: ["item_02", "item_03", "item_06"],
            outcome: "Mbok Sri mengangguk pelan. \"Jahe dan madu. Yang pahit dan yang manis. Kunyit juga — untuk pikiran yang kusut. Kau sudah baca catatan Eyang, ya?\" Ia menyerahkan rimpang dan botol ke tanganmu."
          },
          {
            action_id: "act_ambil_minyak",
            description: "Mengambil Minyak Urut Cimande untuk perlindungan sendi.",
            category: "hub",
            once: true,
            unlocked_item_id: "item_05",
            outcome: "Mbok Sri menyemprotkan sedikit minyak ke pergelangan tanganmu. Wanginya tajam — kayu putih, cengkeh, dan sesuatu yang tidak kau kenal. \"Oleskan sebelum bertarung. Yang licin melindungi sendi.\""
          },
          {
            action_id: "act_mbok_hint",
            description: "Bertanya pada Mbok Sri tentang resep jamu.",
            category: "hub",
            once: true,
            stat_changes: { stat2: 5 },
            outcome: "\"Jamu stamina? Jahe merah plus madu hutan. Jamu ketenangan? Kunyit plus madu. Rakit di meja rakit kapan pun kau mau. Jangan takut — yang gagal cuma bikin lidah pahit, bukan mati.\""
          },
          {
            action_id: "act_ke_pasar",
            description: "Berjalan menyusuri gang sempit menuju gelanggang pasar malam.",
            category: "exploration",
            next_location_id: "loc_04_pasar_malam",
            transition_text: "Kau melangkah keluar dari padepokan saat senja mulai memerah. Bau kemenyan berubah menjadi bau gorengan dan asap knalpot. Gang sempit di antara rumah-rumah penduduk membawa kau ke jantung kota kecamatan — tempat di mana hukum bukan ditentukan wasit, melainkan penonton yang memegang uang.\n\nSetiap langkah terasa lebih berat. Bukan karena fisik — tapi karena kau tahu, di pasar malam ini, kau bukan murid padepokan lagi. Kau hanya petarung tak bernama yang harus membuktikan diri di atas ring kain yang berlumur darah orang lain."
          },
          {
            action_id: "act_kembali_dari_dapur",
            description: "Kembali ke ruang utama Padepokan.",
            category: "hub",
            next_location_id: "loc_01_padepokan",
            transition_text: "Kau meninggalkan dapur dengan tas yang lebih berat. Bau rimpang menempel di pakaianmu — bau yang akan kau bawa sampai ring nanti."
          }
        ]
      },

      // ============================================================
      // LOC 04 - PASAR MALAM (COMBAT PREMAN)
      // ============================================================
      {
        id: "loc_04_pasar_malam",
        name: "Gelanggang Underground Pasar Malam",
        category: "exploration",
        image: "assets/images/scene_pasarmalam.webp",
        narrative: "Sorak sorai penonton dan aroma minyak jelantah membaur di arena ring kain yang dipasang di tengah Pasar Malam. Ini arena tak resmi di mana para petarung jalanan menguji mental.\n\nDi seberang, pria berjas mahal bersandar di mobil hitam, mengamati dari kejauhan. Seorang preman bertato tengah memanaskan otot di dalam ring. Perantara berjas lusuh mendekatimu dan berbisik, \"Nak, ini bukan tempat anak padepokan. Kecuali kau mau main denganku dulu.\"",
        action_options: [
          {
            action_id: "act_hadapi_preman",
            description: "Naik ke ring dan hadapi preman pasar.",
            category: "arena",
            once: true,
            combat: {
              enemy_name: "Preman Pasar",
              enemy_emoji: "💢",
              enemy_stamina: 90,
              enemy_postur: 5,
              enemy_pattern: "BERAT",
              intro: "Preman itu lebih besar darimu — bekas luka di alisnya bercerita tentang puluhan perkelahian jalanan. Ia tidak memasang kuda-kuda. Ia hanya berdiri, tangan rileks, seperti sedang menunggu bus. Namun matanya tidak pernah berkedip dari dagumu.",
              rounds: [
                {
                  round: 1,
                  telegraph: "Preman itu mengangkat bahu kanannya. Bukan tarikan penuh, hanya setengah. Matanya turun ke dadamu. Kaki kanannya bergeser satu langkah ke samping. Ini bukan pukulan; ini ancang-ancang menerjang dan menubruk. Napasnya pendek dua kali.",
                  options: [
                    {
                      label: "Menunggu. Siku terangkat, terima terjangan, balas dari dalam.",
                      outcome: "Tubuh besar itu menabrak siku kirimu. Bunyi berdebam — preman itu menggeram dan mundur, napasnya memburu. Siku adalah tulang terkuat; dia sudah tahu sekarang.",
                      effects: { player_qi: -3, enemy_postur: -3, player_momentum: 1 }
                    },
                    {
                      label: "Geser ke samping, biarkan dia menabrak tali ring.",
                      outcome: "Tubuhnya menabrak tali ring saat kau berputar. Tapi ia lambat, tidak goyah. Napasmu mulai berat.",
                      effects: { player_stamina: -8 }
                    },
                    {
                      label: "Menerjang balik dengan pukulan kombinasi.",
                      outcome: "Kau menerjang — tapi dia terlalu besar. Tubuhnya seperti beton. Pukulanmu tidak masuk, dan bahunya menghantam dadamu. Kau terlempar setengah meter.",
                      effects: { player_stamina: -15, player_postur: -1 }
                    }
                  ]
                },
                {
                  round: 2,
                  telegraph: "Preman itu bangkit dengan tatapan berbeda. Kali ini ia lebih waspada. Tangan kanannya menggantung rendah — siap memukul perut. Bahunya sedikit miring ke kiri, tapi kaki kirinya masih lambat berputar. Kau melihat celah di sisi kirinya.",
                  options: [
                    {
                      label: "Siku penangkis tepat waktu — tangkap hook badannya.",
                      outcome: "Pukulan badannya menghantam sikumu, bukan perutmu. Saat ia terkejut, kau meluncurkan pukulan pendek ke hidungnya. Darah mengalir. Ia mengumpat.",
                      effects: { player_qi: -3, enemy_postur: -3, player_momentum: 1 }
                    },
                    {
                      label: "Serang dari sisi kiri. Dia lambat berputar.",
                      outcome: "Kau melangkah ke kiri dan memukul dari sudut mati. Preman itu terhuyung — pertama kali ia mundur. Ternyata sisi kirinya memang lemah.",
                      effects: { player_qi: -2, enemy_stamina: -6, enemy_postur: -2 }
                    },
                    {
                      label: "Tangkis dengan lengan terbuka, balas dengan tendangan.",
                      outcome: "Pukulan badannya tetap masuk. Napasmu tercekat, dan tendanganmu melebar. Ia masih berdiri — dan sekarang ia tahu kau sedang kesakitan.",
                      effects: { player_stamina: -12, player_postur: -1 }
                    }
                  ]
                },
                {
                  round: 3,
                  telegraph: "Preman itu mengusap mulut, bahunya naik-turun. Napasnya pendek-pendek. Ia lelah, tapi masih berbahaya. Kali ini ia mengangkat bahu kanan tinggi-tinggi — hook selebar-lebarnya, mengandalkan tenaga bukan akurasi.",
                  options: [
                    {
                      label: "Siku penangkis — tangkap hook dan balas ke rusuknya.",
                      outcome: "Siku kirimu menahan hook-nya. Saat ia membuka, kau meluncurkan pukulan pendek ke rusuk kirinya. Preman itu tertekuk, lalu jatuh ke kanvas. Tidak bangun lagi.",
                      effects: { player_qi: -3, enemy_stamina: -18, enemy_postur: -3 }
                    },
                    {
                      label: "Mundur, biarkan dia menghabiskan tenaga, lalu serang.",
                      outcome: "Hook-nya meleset. Napasnya memburu keras. Kau melangkah masuk dan melancarkan pukulan atas ke dagunya. Ia terhuyung ke tali ring, hampir jatuh.",
                      effects: { enemy_stamina: -10, enemy_postur: -2 }
                    },
                    {
                      label: "Tangkis dengan dua tangan, tunggu dia lelah total.",
                      outcome: "Kau menahan hook dengan dua tangan. Tenaga preman itu luar biasa — tapi napasnya habis. Saat ia menjatuhkan tangannya, kau sudah siap.",
                      effects: { player_stamina: -6, enemy_postur: -2 }
                    }
                  ]
                }
              ],
              victory: {
                outcome: "Preman itu tidak bangkit. Ring kain sunyi sejenak — lalu sorak penonton memecah udara. Perantara berjas lusuh mendekatimu dengan wajah pucat, menyodorkan kertas lusuh. \"Tiket seleksi GOR,\" katanya cepat. \"Ambil dan pergi.\"",
                stat_changes: { stat3: 20 },
                unlocked_item_id: "item_11",
                sets_flag: "ep1_refused_bribe"
              },
              defeat: {
                outcome: "Kau terkapar di kanvas kotor. Preman itu meludah di sampingmu, lalu berbalik ke perantara. Kau mendengar mereka tertawa. Tapi saat kau bangkit, seorang penonton tua berbisik: \"Anak padepokan, ya? Aku lihat usahamu. Coba lagi besok.\"",
                stat_changes: { stat1: -20, stat3: -5 },
                sets_flag: "ep1_lost_to_preman"
              }
            }
          },
          {
            action_id: "act_terima_suplemen",
            description: "Menerima botol jamu oplosan dari perantara tanpa bertarung.",
            category: "arena",
            once: true,
            stat_changes: { stat1: -20, stat2: -30, stat3: -20 },
            unlocked_item_id: "item_10",
            sets_flag: "ep1_took_doping",
            outcome: "Botol itu dingin di tanganmu. Kau menenggaknya — dan beberapa detik kemudian, jantungmu berdebar terlalu cepat. Bukan kekuatan. Ini racun. Kau muntah di sudut gang. Perantara tertawa dan berlalu."
          },
          {
            action_id: "act_ke_warung",
            description: "Beristirahat di warung kopi pinggir pasar.",
            category: "hub",
            next_location_id: "loc_04b_warung",
            transition_text: "Kau meninggalkan ring dan menyusuri lorong pasar yang sesak. Di ujung, warung kopi tua dengan lampu kuning temaram. Beberapa orang tua duduk di bangku panjang, mengobrol pelan. Di sini kau bisa menenangkan diri."
          },
          {
            action_id: "act_ke_gor",
            description: "Menuju GOR Kejuaraan Seleksi Kecamatan.",
            category: "arena",
            required_item_id: "item_11",
            next_location_id: "loc_05_gor",
            transition_text: "Dengan tiket di tangan, kau berjalan menuju GOR. Di sepanjang jalan, poster-poster nama juara bertahan menatapmu dari dinding. Malam ini, salah satu dari mereka akan melawanmu — atau kau akan pulang tanpa pernah masuk ring."
          }
        ]
      },

      // ============================================================
      // LOC 04B - WARUNG KOPI (HINT BROTO)
      // ============================================================
      {
        id: "loc_04b_warung",
        name: "Warung Kopi Pinggir Pasar",
        category: "hub",
        image: "assets/images/scene_pasarmalam.webp",
        rest_available: true,
        narrative: "Warung kopi ini seperti potret masa lalu: bangku kayu panjang, meja marmer retak, dan radio tua yang menyala samar. Di sudut, sekelompok pria tua bermain kartu sambil mengobrol tentang juara kecamatan tahun lalu.\n\nDi luar, kau sempat melihat pria berjas mahal dari ring tadi masuk ke mobil hitam. Salah satu pria tua mengikuti arah pandangmu.",
        action_options: [
          {
            action_id: "act_dengar_broto",
            description: "Duduk dekat orang tua dan dengarkan cerita tentang Broto.",
            category: "hub",
            once: true,
            stat_changes: { stat2: 8 },
            sets_flag: "ep1_knows_broto",
            outcome: "\"Itu Broto,\" kata orang tua itu pelan. \"Bandar. Dia selalu mencari petarung muda yang bisa dia beli. Broto tidak pernah kalah — bukan karena ia kuat, karena ia selalu punya dua kuda. Kalau kau tolak suapnya, ia sewa orang untuk menghancurkanmu. Kalau kau terima, ia punya bukti untuk memerasmu seumur hidup.\" Ia menyeruput kopinya. \"Ingat wajahnya. Suatu hari kau akan melihatnya lagi.\""
          },
          {
            action_id: "act_beli_kopi",
            description: "Memesan kopi tubruk dan duduk menenangkan diri.",
            category: "hub",
            once: true,
            stat_changes: { stat1: 5, stat2: 5 },
            outcome: "Kopi tubruk itu pahit — persis seperti yang biasa nenek buat. Untuk sesaat, kau merasa seperti pulang."
          },
          {
            action_id: "act_kembali_pasar",
            description: "Kembali ke gelanggang pasar malam.",
            category: "exploration",
            next_location_id: "loc_04_pasar_malam",
            transition_text: "Kau kembali ke gelanggang. Sorak penonton masih terdengar — pertarungan malam belum berakhir. Tapi kau sudah tahu apa yang harus kau lakukan."
          }
        ]
      },

      // ============================================================
      // LOC 05 - GOR KECAMATAN (FINAL BOSS)
      // ============================================================
      {
        id: "loc_05_gor",
        name: "GOR Kejuaraan Seleksi Kecamatan",
        category: "arena",
        image: "assets/images/scene_gor.webp",
        narrative: "Lampu sorot kuning menerangi Ring Octagon GOR Kecamatan. Ratusan penonton memadati tribun kayu. Ini arena resmi pertama menuju jenjang karir nasional.\n\nDi sudut merah, sang Juara Bertahan Kecamatan berdiri dengan tenang — terkenal dengan tendangan melingkar cepatnya. Ia tidak tersenyum, tidak melotot. Hanya menatap. Wasit memberi sinyal pertarungan final dimulai.",
        action_options: [
          {
            action_id: "act_hadapi_juara",
            description: "Naik ke ring dan hadapi Juara Bertahan Kecamatan.",
            category: "arena",
            once: true,
            required_item_id: "item_11",
            combat: {
              enemy_name: "Juara Bertahan Kecamatan",
              enemy_emoji: "🥇",
              enemy_stamina: 130,
              enemy_postur: 5,
              enemy_pattern: "BERTAHAN",
              intro: "Ia melangkah ke tengah ring dengan langkah pendek, hati-hati, seperti kucing. Tidak ada provokasi. Tidak ada senyum. Ini petarung yang sudah sering menang — dan tahu bahwa kemenangan datang dari sabar, bukan dari amarah.",
              rounds: [
                {
                  round: 1,
                  telegraph: "Kakinya bergerak maju dengan langkah kecil, hampir tanpa suara. Bahu kirinya naik sedikit. Matanya tidak lepas dari perutmu. Ia sabar — membaca, bukan menyerang. Ia akan menunggu kau bergerak dulu.",
                  options: [
                    {
                      label: "Napas dalam. Biarkan dia menunggu lebih lama.",
                      outcome: "Kau menarik napas panjang. Untuk tiga detik, ring sunyi. Juara itu mengangkat alis — ia tidak menyangka kau bisa setenang ini. Untuk pertama kali, kau melihat keraguan di matanya.",
                      effects: { player_qi: 12 }
                    },
                    {
                      label: "Tapak terbuka — pecah pertahanannya dengan serangan langsung.",
                      outcome: "Tapak kananmu menghantam lengannya yang terangkat. Tidak masuk, tapi posturnya tergoyah — ia tidak menyangka kau berani menyerang duluan.",
                      effects: { player_qi: -4, enemy_postur: -2 }
                    },
                    {
                      label: "Geser ke samping — pancing dia bergerak.",
                      outcome: "Kau geser. Ia juga geser, seimbang. Untuk beberapa detik, kalian seperti dua pencak yang saling mengukur. Tidak ada yang menyerang. Sabar.",
                      effects: { player_qi: -2 }
                    }
                  ]
                },
                {
                  round: 2,
                  telegraph: "Kali ini Juara itu bergerak duluan. Kakinya melingkar — tendangan spin kick dari arah kanan. Matanya sudah membaca bahwa kau mulai tidak sabar. Ia ingin menghukum itu.",
                  options: [
                    {
                      label: "Tangkap kakinya, banting ke kanvas.",
                      outcome: "Kau menangkap pergelangan kakinya dan mendorong ke samping. Ia terhuyung — dan untuk sesaat, kau melihat ekspresi yang belum pernah kau lihat: kaget.",
                      effects: { player_qi: -3, enemy_postur: -2, player_momentum: 1 }
                    },
                    {
                      label: "Mundur satu langkah, angkat kedua tangan, tangkis.",
                      outcome: "Tendangan melingkarnya menghantam lenganmu. Rasanya seperti ditabrak motor. Tapi lenganmu menahan. Ia mendarat dengan ringan, menyeringai tipis.",
                      effects: { player_stamina: -8 }
                    },
                    {
                      label: "Bungkuk, terobos masuk, serang badannya.",
                      outcome: "Kau bungkuk — tapi tendangannya tetap masuk. Kaki kirinya menghantam bahumu. Kau terjatuh ke tali ring, telinga berdenging.",
                      effects: { player_stamina: -18, player_postur: -1 },
                      debuff: { name: "Telinga Berdenging" }
                    }
                  ]
                },
                {
                  round: 3,
                  telegraph: "Ia tidak lagi tersenyum. Kakinya kembali ke kuda-kuda lebar — sabar, tunggu. Tapi ada sesuatu yang berubah: napasnya sedikit lebih pendek. Ia mulai lelah. Posturnya mulai turun. Kalau kau bisa menekan lebih keras, celahnya akan terbuka.",
                  options: [
                    {
                      label: "Tapak terbuka — tekan terus. Jangan beri dia jeda.",
                      outcome: "Tapak kirimu menghantam lengannya, tapak kanan menyusul ke dadanya. Ia mundur — pertama kali ia mundur. Penonton bersorak: juara mereka goyah!",
                      effects: { player_qi: -4, enemy_stamina: -6, enemy_postur: -2 }
                    },
                    {
                      label: "Geser, pancing spin kick, hindari di detik terakhir.",
                      outcome: "Ia melancarkan spin kick. Kau sudah membaca. Satu langkah ke samping, dan kakinya melintas di udara kosong. Ia kehilangan keseimbangan, terjatuh ke satu lutut.",
                      effects: { player_qi: -2, enemy_postur: -2 }
                    },
                    {
                      label: "Napas dalam — pulihkan Qi untuk serangan terakhir.",
                      outcome: "Kau menarik napas. Ia juga mengambil jeda. Ring sunyi, dan kau merasakan dua detak jantung lewat sebelum ia bergerak lagi.",
                      effects: { player_qi: 10 }
                    }
                  ]
                },
                {
                  round: 4,
                  telegraph: "Ia berdiri tegak, tangannya menggantung. Wajahnya sudah tidak tenang. Kakinya berat. Ia mengangkat tangan kanan tinggi — terlalu tinggi, terlalu lebar. Ini hook pamungkas: pukulan yang ia lepaskan saat kehabisan akal. Matanya berkedip dua kali sebelum menyerang.",
                  options: [
                    {
                      label: "Siku penangkis — tangkap hook, akhiri.",
                      outcome: "Kau melangkah masuk. Siku kananmu menangkis hook-nya dan berputar menjadi serangan balik ke dagunya. Ia jatuh tak sadarkan diri. Penonton meledak.",
                      effects: { player_qi: -3, enemy_stamina: -15, enemy_postur: -3 }
                    },
                    {
                      label: "Mundur, biarkan hook meleset, balas dengan kombinasi.",
                      outcome: "Hook meleset. Kau mundur dengan tenang, dan saat ia terhuyung karena momentum, pukulan lurusmu menghantam dagunya. Ia jatuh ke kanvas. Wasit menghitung. Sepuluh.",
                      effects: { enemy_stamina: -12, enemy_postur: -2 }
                    },
                    {
                      label: "Maju masuk, tangkap lengannya, banting ke kanvas.",
                      outcome: "Kau menangkap lengannya. Satu putaran pinggul, dan tubuh juara itu terhempas. Kanvas bergetar. Wasit menghitung. Satu. Dua. Tiga. Empat. Lima...",
                      effects: { player_qi: -3, enemy_stamina: -20, enemy_postur: -3 }
                    }
                  ]
                }
              ],
              victory: {
                outcome: "Tubuh Juara Bertahan terhempas ke kanvas! Wasit mengangkat tanganmu tinggi-tinggi di tengah gemuruh sorak-sorai. Kau melihat Eyang Suryo berdiri di tribun — ia mengangguk pelan. Kau resmi menjadi JUARA KECAMATAN.",
                trigger_ending_id: "true_ending"
              },
              defeat: {
                outcome: "Kau terkapar di kanvas. Tendangan melingkar lawan masih terasa di pelipismu. Kau kalah angka. Di tribun, Eyang Suryo menutup matanya. Tapi kau melihat tangannya terkepal — bukan karena marah, tapi karena menahan haru. Ia masih percaya padamu.",
                stat_changes: { stat1: -30, stat3: -10 },
                trigger_ending_id: "lost_gor_ending"
              }
            }
          }
        ]
      }
    ],

    // ============================================================
    // ITEMS
    // ============================================================
    items: [
      { id: "item_00", name: "Handwrap Ayah", emoji: "🧣", category: "bukti", description: "Kain merah lusuh pemberian nenek. Bau tembakau dan doa yang tak sempat diucapkan ayah." },
      { id: "item_01", name: "Kitab Napas Sumbu Jagat", emoji: "📜", category: "kitab", description: "Panduan jurus olah napas peningkat Qi. Jangan dihafal — diresapi." },
      { id: "item_02", name: "Rimpang Jahe Merah", emoji: "🫚", category: "herbal", description: "Bahan jamu alami pemulih stamina. Pahit, tapi menyembuhkan." },
      { id: "item_03", name: "Madu Hutan Murni", emoji: "🍯", category: "pelengkap", description: "Ekstrak energi murni penguat daya tahan. Yang manis memberi tenaga." },
      { id: "item_04", name: "Handwrap Serat Pasak", emoji: "🥊", category: "peralatan", description: "Pelindung buku jari untuk efisiensi pukulan. Diberikan sebagai tanda hormat." },
      { id: "item_05", name: "Minyak Urut Cimande", emoji: "🧴", category: "pelengkap", description: "Minyak herbal pereda kram dan memar. Yang licin melindungi sendi." },
      { id: "item_06", name: "Kunyit Tua", emoji: "🟡", category: "herbal", description: "Rimpang kuning pekat. Pahit menusuk, tapi menenangkan pikiran." },
      { id: "item_10", name: "Jamu Oplosan Terlarang", emoji: "🧪", category: "bukti", description: "Doping ilegal penghancur karir. Menyimpan racun dan penyesalan." },
      { id: "item_11", name: "Tiket Seleksi GOR Kecamatan", emoji: "🎟️", category: "bukti", description: "Izin resmi bertanding di ajang kecamatan." },
      { id: "item_jamu_stamina", name: "Jamu Pendekar Stamina", emoji: "🍵", category: "konsumabel", description: "Hasil rakit jahe + madu. Memulihkan stamina." }
    ],

    // ============================================================
    // RECIPES
    // ============================================================
    recipes: [
      {
        recipe_id: "rec_jamu_stamina",
        result_item_name: "Jamu Pendekar Stamina",
        priority: 1,
        required_item_ids: ["item_02", "item_03"],
        description: "Ramuan pahit-manis pemulih 30 Stamina.",
        reward_stat_changes: { stat1: 30 }
      },
      {
        recipe_id: "rec_jamu_qi",
        result_item_name: "Jamu Ketenangan Qi",
        priority: 1,
        required_item_ids: ["item_06", "item_03"],
        description: "Kunyit + Madu memulihkan 25 Qi.",
        reward_stat_changes: { stat2: 25 }
      },
      {
        recipe_id: "rec_jamu_anti",
        result_item_name: "Jamu Anti-Kram",
        priority: 1,
        required_item_ids: ["item_02", "item_05"],
        description: "Jahe + Minyak urut. Hapus 1 debuff aktif.",
        reward_stat_changes: { stat1: 5 }
      },
      {
        recipe_id: "rec_jurus_konter",
        result_item_name: "Jurus Konter Sumbu Jagat",
        priority: 2,
        required_categories: { kitab: 1, peralatan: 1 },
        description: "Kitab + Peralatan mempertajam respons. +10 Qi.",
        reward_stat_changes: { stat2: 10 }
      },
      {
        recipe_id: "rec_jamu_generic",
        result_item_name: "Jamu Sederhana",
        priority: 3,
        required_categories: { herbal: 1, pelengkap: 1 },
        description: "Campuran herbal + pelengkap. Efek kecil.",
        reward_stat_changes: { stat1: 15, stat2: 5 }
      }
    ],

    // ============================================================
    // ENDINGS
    // ============================================================
    endings: {
      true_ending: {
        title: "TRUE ENDING: Juara Kecamatan & Tiket Kabupaten",
        narrative: "Tanganmu diangkat tinggi oleh Wasit di tengah sorak gemuruh GOR Kecamatan. Dengan mental baja dan jurus tradisi yang kokoh, kau memenangkan Sabuk Kejuaraan Kecamatan dan melangkah mantap menuju LIGA KABUPATEN.\n\nEyang Suryo menyalami kau di tepi ring. \"Kau masih belum menyadari sesuatu,\" katanya pelan. \"Kemenangan ini bukan tentang sabuk. Ini tentang kau yang memilih tidak menjadi Danu, tidak menjadi preman, tidak menjadi Broto. Itu yang membuatmu berbeda.\"",
        next_episode_id: "ep_02_kabupaten"
      },
      lost_gor_ending: {
        title: "ENDING: Kekalahan di Ring Pertama",
        narrative: "Kau pulang tanpa sabuk. Eyang Suryo tidak marah — ia hanya menutup mata saat kau melewatinya. Namun di gerbang padepokan, ia meletakkan tangan di bahumu. \"Kalah di ring pertama bukan aib. Kalah di ring pertama dan tidak kembali — itu aib. Kau akan kembali.\"\n\nKau mengangguk. Dan di dalam dadamu, sesuatu yang lebih keras dari ambisi mulai terbentuk: ketekunan.",
        next_episode_id: "ep_02_kabupaten"
      },
      stat_zero_ending: {
        title: "BAD ENDING: Keterpurukan Fisik & Cedera",
        narrative: "Stamina atau Ketenangan Batin habis total. Tubuhmu ambruk akibat dipaksa bertarung tanpa perhitungan matang, mengakhiri impianmu di panggung petarung."
      },
      stat3_zero_ending: {
        title: "BAD ENDING: Murid Terbuang & Hancur Nama Baik",
        narrative: "Reputasimu menyentuh angka 0% akibat skandal doping atau tindakan tidak terpuji. Kau dikeluarkan dari padepokan dan di-ban selamanya dari liga."
      }
    }
  }]
};