'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import {
  Heart, BookOpen, Droplets, Moon, Users, Leaf, MessageCircle,
  Check, ChevronRight, ChevronLeft, Star, ArrowRight,
} from 'lucide-react';

// ── Step data ───────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    icon: Heart,
    color: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
    activeColor: 'bg-rose-500',
    title: {
      en: 'Understanding the Shahada',
      tr: 'Şehadeti Anlamak',
      ar: 'فهم الشهادة',
    },
    subtitle: {
      en: 'What you just said — and what it means',
      tr: 'Az önce ne söylediniz ve ne anlama geliyor',
      ar: 'ما قلته للتو — وماذا يعني',
    },
    content: {
      en: [
        'You have just said: **"Ashhadu an lā ilāha illā-llāh, wa ashhadu anna Muḥammadan rasūlu-llāh"**',
        '**"I bear witness that there is no god but Allah, and I bear witness that Muhammad ﷺ is the Messenger of Allah."**',
        'This is the most important statement in Islam. It has two parts:',
        '• **Lā ilāha illā-llāh** — There is no deity worthy of worship except Allah alone. This means removing every other object of devotion from your heart.',
        '• **Muḥammadun rasūlu-llāh** — Muhammad ﷺ is His final messenger. This means following his example (Sunnah) as the practical guide for your faith.',
        'By saying this sincerely, all your previous sins are forgiven. You begin completely clean.',
      ],
      tr: [
        'Az önce şunu söylediniz: **"Eşhedü en la ilahe illallah ve eşhedü enne Muhammeden resulullah"**',
        '**"Allah\'tan başka ilah olmadığına, Muhammed\'in ﷺ O\'nun resulü olduğuna şehadet ederim."**',
        'Bu, İslam\'ın en önemli ifadesidir. İki bölümden oluşur:',
        '• **La ilahe illallah** — Yalnızca Allah\'tan başka ibadet edilmeye layık hiçbir ilah yoktur. Bu, kalbinizdeki her başka tapınma nesnesini kaldırmak anlamına gelir.',
        '• **Muhammeden resulullah** — Hz. Muhammed ﷺ O\'nun son elçisidir. Bu, onun örneğini (Sünnetini) pratik bir rehber olarak takip etmek anlamına gelir.',
        'Bunu samimiyetle söyleyerek tüm geçmiş günahlarınız bağışlanır. Tamamen temiz bir sayfa ile başlarsınız.',
      ],
      ar: [
        'لقد قلت للتو: **"أشهد أن لا إله إلا الله، وأشهد أن محمداً رسول الله"**',
        'هذه أهم جملة في الإسلام. لها جزءان:',
        '• **لا إله إلا الله** — لا معبود بحق سوى الله وحده. هذا يعني إزالة كل موضوع آخر للعبادة من قلبك.',
        '• **محمد رسول الله** — محمد ﷺ هو رسوله الأخير. هذا يعني اتباع مثاله (السنة) دليلاً عملياً لإيمانك.',
        'بقولها بصدق، تُغفر جميع ذنوبك السابقة. تبدأ من جديد بصفحة نظيفة تماماً.',
      ],
    },
  },
  {
    id: 2,
    icon: Droplets,
    color: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
    activeColor: 'bg-sky-500',
    title: {
      en: 'Your First Purification (Ghusl)',
      tr: 'İlk Temizliğiniz (Gusül)',
      ar: 'أول طهارة لك (الغسل)',
    },
    subtitle: {
      en: 'The ritual bath that marks your new beginning',
      tr: 'Yeni başlangıcınızı işaret eden ritüel banyo',
      ar: 'الغسل الذي يُعلم بدايتك الجديدة',
    },
    content: {
      en: [
        'As a new Muslim, scholars recommend performing a **full ritual bath (ghusl)** to symbolise your spiritual rebirth.',
        '**How to perform ghusl:**',
        '1. Make the intention (niyyah) in your heart: "I am performing ghusl to become purified."',
        '2. Wash both hands thoroughly three times.',
        '3. Wash your private parts.',
        '4. Perform wudu (ablution) as you will learn for prayer.',
        '5. Pour water over your entire body, starting with the right side, ensuring every part of your body is wet — including the hair roots.',
        'After ghusl, you are in a state of purity ready for prayer.',
      ],
      tr: [
        'Yeni bir Müslüman olarak, âlimler ruhani yeniden doğuşunuzu sembolize etmek için **tam bir gusül abdesti** almanızı tavsiye eder.',
        '**Gusül nasıl yapılır:**',
        '1. Kalbinizde niyet edin: "Temizlenmek için gusül alıyorum."',
        '2. Her iki elinizi üç kez iyice yıkayın.',
        '3. Avret bölgenizi yıkayın.',
        '4. Namaz için öğreneceğiniz gibi abdest alın.',
        '5. Sağ taraftan başlayarak tüm vücudunuza su dökün; saç kökleri de dahil her yerin ıslandığından emin olun.',
        'Gusülden sonra namaz için hazır temiz bir halde olursunuz.',
      ],
      ar: [
        'بوصفك مسلماً جديداً، يوصي العلماء بأداء **الغسل الكامل** ترمزاً لولادتك الروحية من جديد.',
        '**كيفية أداء الغسل:**',
        '1. انوِ بقلبك: "أغتسل لأتطهر."',
        '2. اغسل كلتا يديك ثلاث مرات جيداً.',
        '3. اغسل العورة.',
        '4. توضأ كما ستتعلم للصلاة.',
        '5. صبّ الماء على جسمك كاملاً مبدئاً بالجانب الأيمن، مع التأكد من أن كل جزء من جسمك ابتلّ — بما في ذلك جذور الشعر.',
        'بعد الغسل ستكون في حالة طهارة مستعداً للصلاة.',
      ],
    },
  },
  {
    id: 3,
    icon: Moon,
    color: 'text-violet-400 bg-violet-500/20 border-violet-500/30',
    activeColor: 'bg-violet-500',
    title: {
      en: 'Learning How to Pray',
      tr: 'Namaz Kılmayı Öğrenmek',
      ar: 'تعلُّم الصلاة',
    },
    subtitle: {
      en: 'The five daily prayers — your new daily rhythm',
      tr: 'Beş vakit namaz — yeni günlük ritminiz',
      ar: 'الصلوات الخمس — إيقاعك اليومي الجديد',
    },
    content: {
      en: [
        'Prayer (Salah) is the second pillar of Islam and the backbone of your daily spiritual life. Muslims pray **five times** a day:',
        '• **Fajr** — Dawn prayer (2 units)',
        '• **Dhuhr** — Midday prayer (4 units)',
        '• **Asr** — Afternoon prayer (4 units)',
        '• **Maghrib** — Sunset prayer (3 units)',
        '• **Isha** — Night prayer (4 units)',
        'You do **not** need to pray perfectly from day one. Start by learning the **wudu (ablution)** and the **opening chapter (Al-Fatiha)**.',
        'Ask a Muslim friend or contact us at KIM — we offer free one-on-one prayer learning sessions for new Muslims every week.',
        '**Tip:** Set alarms on your phone at prayer times as a reminder for the first few weeks.',
      ],
      tr: [
        'Namaz (Salat), İslam\'ın ikinci şartı ve günlük manevi hayatınızın omurgasıdır. Müslümanlar günde **beş kez** namaz kılar:',
        '• **Sabah** — Sabah namazı (2 rekat)',
        '• **Öğle** — Öğle namazı (4 rekat)',
        '• **İkindi** — İkindi namazı (4 rekat)',
        '• **Akşam** — Akşam namazı (3 rekat)',
        '• **Yatsı** — Yatsı namazı (4 rekat)',
        'İlk günden mükemmel namaz kılmanız **gerekmiyor**. Önce **abdest** ve **Fatiha Suresi**\'ni öğrenin.',
        'Bir Müslüman arkadaşınıza sorun veya KİM ile iletişime geçin — her hafta yeni Müslümanlara ücretsiz bire bir namaz öğretimi sunuyoruz.',
        '**İpucu:** İlk birkaç hafta hatırlatıcı olarak telefonunuza namaz vakitlerinde alarm kurabilirsiniz.',
      ],
      ar: [
        'الصلاة هي الركن الثاني في الإسلام وعمود حياتك الروحية اليومية. يصلي المسلمون **خمس مرات** في اليوم:',
        '• **الفجر** — صلاة الفجر (ركعتان)',
        '• **الظهر** — صلاة الظهر (4 ركعات)',
        '• **العصر** — صلاة العصر (4 ركعات)',
        '• **المغرب** — صلاة المغرب (3 ركعات)',
        '• **العشاء** — صلاة العشاء (4 ركعات)',
        'لا **تحتاج** إلى الصلاة بشكل مثالي من اليوم الأول. ابدأ بتعلم **الوضوء** و**الفاتحة**.',
        'اسأل صديقاً مسلماً أو تواصل مع كيم — نقدم جلسات تعليم صلاة مجانية فردية للمسلمين الجدد كل أسبوع.',
      ],
    },
  },
  {
    id: 4,
    icon: BookOpen,
    color: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    activeColor: 'bg-amber-500',
    title: {
      en: 'Getting Your First Quran',
      tr: 'İlk Kur\'anınızı Almak',
      ar: 'الحصول على أول قرآن لك',
    },
    subtitle: {
      en: 'Your guide and companion for life',
      tr: 'Hayat boyu rehberiniz ve arkadaşınız',
      ar: 'دليلك ورفيقك مدى الحياة',
    },
    content: {
      en: [
        'The **Quran** is the direct word of Allah revealed to Prophet Muhammad ﷺ over 23 years. It is your most important book as a Muslim.',
        '**For new Muslims, we recommend:**',
        '• **A translation in your language** — You do not need to read Arabic yet. Start with a clear translation.',
        '• **"The Clear Quran"** (Dr. Mustafa Khattab) — The most reader-friendly modern English translation.',
        '• **KIM\'s free Quran gift** — Contact us and we will give you a Quran in your language free of charge.',
        '**Where to start reading:**',
        'Begin with **Surah Al-Fatiha** (Chapter 1 — 7 verses). Then read the short chapters at the end (chapters 112–114). These are what you will recite in prayer.',
        'You do not need to read in order. The Quran speaks directly to the heart.',
      ],
      tr: [
        '**Kur\'an**, Allah\'ın Peygamber Muhammed ﷺ\'e 23 yıl boyunca vahyettiği doğrudan sözüdür. Bir Müslüman olarak en önemli kitabınızdır.',
        '**Yeni Müslümanlar için önerilenler:**',
        '• **Kendi dilinizde bir çeviri** — Henüz Arapça okumak zorunda değilsiniz. Net bir çeviriyle başlayın.',
        '• **KİM\'in ücretsiz Kur\'an hediyesi** — Bize ulaşın, kendi dilinizde ücretsiz bir Kur\'an verelim.',
        '**Okumaya nereden başlanır:**',
        '**Fatiha Suresi** (1. Bölüm — 7 ayet) ile başlayın. Ardından sondaki kısa sureleri okuyun (112–114. bölümler). Bunlar namazda okuyacaklarınızdır.',
        'Sırayla okumak zorunda değilsiniz. Kur\'an doğrudan kalbe hitap eder.',
      ],
      ar: [
        '**القرآن الكريم** هو كلام الله المباشر المُنزَّل على النبي محمد ﷺ على مدى 23 عاماً. إنه أهم كتبك بوصفك مسلماً.',
        '**للمسلمين الجدد نوصي بـ:**',
        '• **ترجمة بلغتك** — لست بحاجة إلى القراءة بالعربية بعد. ابدأ بترجمة واضحة.',
        '• **هدية القرآن المجانية من كيم** — تواصل معنا وسنمنحك قرآناً بلغتك مجاناً.',
        '**من أين تبدأ القراءة:**',
        'ابدأ بـ **سورة الفاتحة** (الفصل الأول — 7 آيات). ثم اقرأ السور القصيرة في النهاية (السور 112–114). هذه هي ما ستتلوه في صلاتك.',
      ],
    },
  },
  {
    id: 5,
    icon: Leaf,
    color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    activeColor: 'bg-emerald-500',
    title: {
      en: 'Your First Practices',
      tr: 'İlk Pratikleriniz',
      ar: 'ممارساتك الأولى',
    },
    subtitle: {
      en: 'Simple daily habits to begin your Islamic life',
      tr: 'İslami hayatınıza başlamak için basit günlük alışkanlıklar',
      ar: 'عادات يومية بسيطة لبدء حياتك الإسلامية',
    },
    content: {
      en: [
        'You do not need to change everything at once. Start with these simple daily practices:',
        '**"Bismillah"** — Say "In the name of Allah" before eating, drinking, and beginning any task. A constant reminder that your life is in His hands.',
        '**"Alhamdulillah"** — Say "All praise is for Allah" after eating, when something good happens, and when you sneeze. Build gratitude into your day.',
        '**"Assalamu Alaykum"** — Greet fellow Muslims with "Peace be upon you." It is a form of prayer for them.',
        '**Food (Halal)** — Begin to avoid pork and alcohol. These are the first dietary restrictions in Islam. Ask us if you need help navigating halal eating in your city.',
        '**Dress** — Modesty (haya) is an Islamic value for both men and women. Change gradually, at your own pace, as your heart feels ready.',
        'Every small step counts. Be gentle with yourself.',
      ],
      tr: [
        'Her şeyi bir anda değiştirmenize gerek yok. Bu basit günlük pratiklerle başlayın:',
        '**"Besmele"** — Her yemekte, içecekte ve herhangi bir işe başlamadan önce "Bismillahirrahmanirrahim" deyin.',
        '**"Elhamdülillah"** — Yemekten sonra, iyi bir şey olduğunda ve aksırdığınızda "Allah\'a hamd olsun" deyin.',
        '**"Esselamu Aleyküm"** — Müslüman kardeşlerinizi "Selam sizin üzerinize olsun" diyerek selamlayın.',
        '**Yemek (Helal)** — Domuz eti ve alkolden kaçınmaya başlayın. Bunlar İslam\'daki ilk diyet kısıtlamalarıdır.',
        '**Giyim** — Haya (utanma), hem erkekler hem de kadınlar için İslami bir değerdir. Kalbiniz hazır hissettikçe yavaş yavaş değiştirin.',
        'Her küçük adım önemlidir. Kendinize karşı nazik olun.',
      ],
      ar: [
        'لا تحتاج إلى تغيير كل شيء دفعة واحدة. ابدأ بهذه الممارسات اليومية البسيطة:',
        '**"بسم الله"** — قل "بسم الله الرحمن الرحيم" قبل الأكل والشرب وبدء أي عمل.',
        '**"الحمد لله"** — قل "الحمد لله" بعد الأكل وعند حدوث شيء جيد وعند العطس.',
        '**"السلام عليكم"** — حيِّ المسلمين بـ"السلام عليكم". إنها دعاء لهم.',
        '**الطعام الحلال** — ابدأ بتجنب لحم الخنزير والكحول. هذان أول قيود غذائية في الإسلام.',
        '**اللباس** — الحياء قيمة إسلامية للرجال والنساء. تغيّر تدريجياً بوتيرتك الخاصة.',
        'كل خطوة صغيرة مهمة. كن رفيقاً بنفسك.',
      ],
    },
  },
  {
    id: 6,
    icon: Users,
    color: 'text-kim-gold bg-kim-gold/10 border-kim-gold/30',
    activeColor: 'bg-kim-gold',
    title: {
      en: 'Finding Your Community',
      tr: 'Topluluğunuzu Bulmak',
      ar: 'إيجاد مجتمعك',
    },
    subtitle: {
      en: 'You are not alone — connect with your new family',
      tr: 'Yalnız değilsiniz — yeni ailenizle bağlanın',
      ar: 'لست وحدك — تواصل مع عائلتك الجديدة',
    },
    content: {
      en: [
        'One of the greatest gifts of Islam is **the community (Ummah)**. You are now part of a global family of 1.8 billion.',
        '**How to connect:**',
        '• **Visit KIM Foundation** — Our center is open every day. Our volunteers speak English, Turkish, Arabic, German, and more. You are always welcome.',
        '• **Friday Prayer (Jum\'ah)** — Every Friday around midday, Muslims gather for a special congregational prayer. Visiting a mosque for Jum\'ah is a powerful experience.',
        '• **New Muslim Support Group** — We host a monthly gathering specifically for new Muslims to share experiences, ask questions, and support each other.',
        '• **WhatsApp Group** — Ask us to add you to our New Muslim Network — a private group of converts and volunteers.',
        'It is normal to feel overwhelmed. It is normal to have doubts. The community is here to walk with you.',
      ],
      tr: [
        'İslam\'ın en büyük nimetlerinden biri **topluluktur (Ümmet)**. Artık 1.8 milyarlık küresel bir ailenin parçasısınız.',
        '**Nasıl bağlanılır:**',
        '• **KİM Vakfı\'nı ziyaret edin** — Merkezimiz her gün açık. Gönüllülerimiz İngilizce, Türkçe, Arapça ve Almanca konuşuyor. Her zaman hoş geldiniz.',
        '• **Cuma Namazı** — Her Cuma öğle vakti, Müslümanlar özel bir cemaat namazı için bir araya gelir.',
        '• **Yeni Müslüman Destek Grubu** — Özellikle yeni Müslümanlar için her ay buluşma düzenliyoruz.',
        '• **WhatsApp Grubu** — Yeni Müslüman Ağımıza eklenmemizi isteyin.',
        'Bunalmış hissetmek normaldir. Şüpheleriniz olması normaldir. Topluluk sizinle yürümek için burada.',
      ],
      ar: [
        'من أعظم نعم الإسلام **الأمة**. أنت الآن جزء من عائلة عالمية من 1.8 مليار شخص.',
        '**كيفية التواصل:**',
        '• **زيارة مؤسسة كيم** — مركزنا مفتوح كل يوم. متطوعونا يتكلمون الإنجليزية والتركية والعربية والألمانية وأكثر.',
        '• **صلاة الجمعة** — كل جمعة حول الظهر، يجتمع المسلمون لصلاة الجمعة. زيارة المسجد للجمعة تجربة قوية.',
        '• **مجموعة دعم المسلمين الجدد** — نستضيف اجتماعاً شهرياً خاصاً للمسلمين الجدد.',
        '• **مجموعة واتساب** — اطلب منا إضافتك إلى شبكة المسلمين الجدد لدينا.',
        'من الطبيعي أن تشعر بالإرهاق. من الطبيعي أن تراودك شكوك. المجتمع هنا ليسير معك.',
      ],
    },
  },
  {
    id: 7,
    icon: MessageCircle,
    color: 'text-teal-400 bg-teal-500/20 border-teal-500/30',
    activeColor: 'bg-teal-500',
    title: {
      en: 'Telling Your Family',
      tr: 'Ailenize Söylemek',
      ar: 'إخبار عائلتك',
    },
    subtitle: {
      en: 'How to share your new faith with the people you love',
      tr: 'Yeni inancınızı sevdiklerinizle nasıl paylaşırsınız',
      ar: 'كيف تشارك إيمانك الجديد مع من تحبهم',
    },
    content: {
      en: [
        'Telling family members about your conversion is one of the most common concerns of new Muslims. There is no single right way — take your time.',
        '**Some guidance:**',
        '• You are **not obligated** to tell anyone immediately. Your faith is between you and Allah first.',
        '• When you are ready, lead with **love** — "I want to share something important about my life."',
        '• Be patient. Some family members take time. This is normal. Continue showing them kindness and good character — that is your greatest argument for Islam.',
        '• **Islam does not cut family ties** — quite the opposite. Maintaining family bonds (silat al-rahim) is highly emphasised in Islam, even with non-Muslim family.',
        '• If you face difficulty, our counselling volunteers can speak privately with you. Contact us.',
        'Your journey is uniquely yours. You set the pace.',
      ],
      tr: [
        'Aile üyelerine ihtidanızı söylemek, yeni Müslümanların en yaygın endişelerinden biridir. Tek bir doğru yol yoktur — zamanınızı alın.',
        '**Bazı rehberlik:**',
        '• Herkese hemen söylemek **zorunda değilsiniz**. İmanınız önce sizinle Allah arasındadır.',
        '• Hazır olduğunuzda, **sevgiyle** başlayın — "Hayatımla ilgili önemli bir şeyi paylaşmak istiyorum."',
        '• Sabırlı olun. Bazı aile üyeleri zaman alır. İyilik ve güzel karakterinizi göstermeye devam edin.',
        '• **İslam aile bağlarını kesmez** — tam tersi. Aile bağlarını sürdürmek (sıla-i rahim) İslam\'da çok vurgulanır.',
        '• Güçlükle karşılaşırsanız, danışma gönüllülerimiz sizinle özel olarak konuşabilir. Bize ulaşın.',
      ],
      ar: [
        'إخبار أفراد الأسرة عن اعتناقك للإسلام أحد أكثر مخاوف المسلمين الجدد شيوعاً. لا توجد طريقة صحيحة واحدة — خذ وقتك.',
        '**بعض التوجيهات:**',
        '• **لست ملزماً** بإخبار أي شخص على الفور. إيمانك بينك وبين الله أولاً.',
        '• حين تكون مستعداً، ابدأ بـ**المحبة** — "أريد أن أشارككم شيئاً مهماً في حياتي."',
        '• كن صبوراً. بعض أفراد الأسرة يحتاجون وقتاً. استمر في إظهار اللطف وحسن الخُلق.',
        '• **الإسلام لا يقطع روابط الأسرة** — بالعكس. صلة الرحم مؤكدة بشدة في الإسلام، حتى مع الأسرة غير المسلمة.',
        '• إذا واجهت صعوبة، يمكن لمتطوعينا الاستشاريين التحدث معك بشكل خاص. تواصل معنا.',
      ],
    },
  },
  {
    id: 8,
    icon: Star,
    color: 'text-kim-navy bg-kim-navy-light border-kim-navy/30',
    activeColor: 'bg-kim-navy',
    title: {
      en: 'Your Journey Continues',
      tr: 'Yolculuğunuz Devam Ediyor',
      ar: 'رحلتك تتواصل',
    },
    subtitle: {
      en: 'Resources, support, and what to learn next',
      tr: 'Kaynaklar, destek ve bundan sonra ne öğrenileceği',
      ar: 'الموارد والدعم وما تتعلمه بعد ذلك',
    },
    content: {
      en: [
        'Taking the Shahada is a beginning, not a destination. Every Muslim — even those born into the faith — is on a lifelong journey of learning and growth.',
        '**Your next learning goals:**',
        '• Perfect your wudu and the 5 daily prayers',
        '• Memorise Al-Fatiha and 3 short surahs',
        '• Learn the 6 pillars of faith (Iman)',
        '• Learn the 5 pillars of practice (Islam)',
        '• Read an introductory book about the Prophet Muhammad ﷺ',
        '**KIM Foundation resources for you:**',
        '• Free **Digital Library** with books in your language → /library',
        '• **What is Islam** — interactive journey through core topics → /what-is-islam',
        '• **How I Live Islam** — practical daily life guidance (coming soon)',
        '• **Weekly sessions** at our center — ask us to join',
        'We are here for you. Every question is welcome. Every struggle is understood.',
      ],
      tr: [
        'Şehadet getirmek bir varış noktası değil, bir başlangıçtır. Her Müslüman — dine doğan bile — öğrenme ve büyümenin ömür boyu yolculuğundadır.',
        '**Sonraki öğrenme hedefleriniz:**',
        '• Abdest ve 5 vakit namazı mükemmelleştirin',
        '• Fatiha ve 3 kısa sureyi ezberleyin',
        '• İmanın 6 şartını öğrenin',
        '• İslam\'ın 5 şartını öğrenin',
        '• Hz. Muhammed ﷺ hakkında bir tanıtım kitabı okuyun',
        '**KİM Vakfı kaynakları:**',
        '• Kendi dilinizde kitaplarla ücretsiz **Dijital Kütüphane** → /library',
        '• **İslam Nedir** — temel konularda etkileşimli yolculuk → /what-is-islam',
        '• Merkezimizde **haftalık oturumlar** — katılmak için bize sorun',
      ],
      ar: [
        'النطق بالشهادة بداية لا نهاية. كل مسلم — حتى من وُلد في الإيمان — في رحلة تعلم ونمو مدى الحياة.',
        '**أهداف تعلمك التالية:**',
        '• أتقن الوضوء والصلوات الخمس',
        '• احفظ الفاتحة و3 سور قصيرة',
        '• تعلم أركان الإيمان الستة',
        '• تعلم أركان الإسلام الخمسة',
        '• اقرأ كتاباً تمهيدياً عن النبي محمد ﷺ',
        '**موارد مؤسسة كيم لك:**',
        '• **مكتبة رقمية** مجانية بكتب بلغتك → /library',
        '• **ما هو الإسلام** — رحلة تفاعلية عبر المواضيع الأساسية → /what-is-islam',
        '• **جلسات أسبوعية** في مركزنا — اسألنا للانضمام',
      ],
    },
  },
];

// ── Markdown-like bold renderer ─────────────────────────────────────────────
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-white font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ── Page component ───────────────────────────────────────────────────────────
export default function TookShahadaPage() {
  const locale = useLocale();
  const l = locale as 'tr' | 'en' | 'ar';
  const isRtl = l === 'ar';

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const step = STEPS[currentStep];
  const Icon = step.icon;
  const totalSteps = STEPS.length;

  function markComplete(idx: number) {
    setCompleted((prev) => new Set(prev).add(idx));
  }

  function goNext() {
    markComplete(currentStep);
    if (currentStep < totalSteps - 1) setCurrentStep((p) => p + 1);
  }

  function goPrev() {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  }

  const headings = {
    en: { eyebrow: 'New Muslim Guide', title: 'I Just Took My Shahada', sub: 'Congratulations. Your life has just changed forever. Here is your step-by-step guide for the next days and weeks.' },
    tr: { eyebrow: 'Yeni Müslüman Rehberi', title: 'Şehadet Getirdim', sub: 'Tebrikler. Hayatınız sonsuza kadar değişti. İşte önümüzdeki günler ve haftalar için adım adım rehberiniz.' },
    ar: { eyebrow: 'دليل المسلم الجديد', title: 'لقد نطقت بالشهادة', sub: 'مبروك. حياتك تغيّرت إلى الأبد. إليك دليلك خطوة بخطوة للأيام والأسابيع القادمة.' },
  };
  const h = headings[l] || headings.en;

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Stars backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                top: `${(i * 17 + 5) % 100}%`,
                left: `${(i * 23 + 7) % 100}%`,
                opacity: 0.15 + (i % 4) * 0.1,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-kim-navy/40 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kim-gold/20 text-kim-gold text-xs font-semibold uppercase tracking-widest mb-6 border border-kim-gold/30">
              {h.eyebrow}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">{h.title}</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">{h.sub}</p>
          </motion.div>
        </div>
      </section>

      {/* Progress bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => {
            const StepIcon = s.icon;
            const isDone = completed.has(i);
            const isCurrent = i === currentStep;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className={`group relative flex-1 h-1.5 rounded-full transition-all duration-300 ${
                  isDone ? 'bg-kim-gold' : isCurrent ? 'bg-white/60' : 'bg-white/15'
                }`}
                title={s.title[l] || s.title.en}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-white/30 text-xs">
          <span>{l === 'ar' ? `الخطوة ${currentStep + 1} من ${totalSteps}` : l === 'tr' ? `${currentStep + 1}/${totalSteps} Adım` : `Step ${currentStep + 1} of ${totalSteps}`}</span>
          <span>{Math.round((completed.size / totalSteps) * 100)}% {l === 'ar' ? 'مكتمل' : l === 'tr' ? 'Tamamlandı' : 'complete'}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Step list sidebar */}
          <div className="hidden lg:block space-y-1">
            {STEPS.map((s, i) => {
              const SIcon = s.icon;
              const isDone = completed.has(i);
              const isCurrent = i === currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                    isCurrent
                      ? 'bg-white/10 text-white'
                      : isDone
                      ? 'text-white/50 hover:text-white/70 hover:bg-white/5'
                      : 'text-white/30 hover:text-white/50 hover:bg-white/5'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isDone ? 'bg-kim-gold' : isCurrent ? 'bg-white/20' : 'bg-white/10'}`}>
                    {isDone ? <Check className="w-3 h-3 text-kim-navy" /> : <span className="text-[9px] font-bold text-white/60">{i + 1}</span>}
                  </span>
                  <span className="truncate text-xs leading-tight">{s.title[l] || s.title.en}</span>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Step header */}
              <div className="px-6 pt-6 pb-5 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium mb-0.5">
                      {l === 'ar' ? `الخطوة ${step.id}` : l === 'tr' ? `${step.id}. Adım` : `Step ${step.id}`}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-white">{step.title[l] || step.title.en}</h2>
                    <p className="text-white/50 text-sm mt-1">{step.subtitle[l] || step.subtitle.en}</p>
                  </div>
                </div>
              </div>

              {/* Step body */}
              <div className="px-6 py-6">
                <ul className="space-y-3">
                  {(step.content[l] || step.content.en).map((line, i) => (
                    <li key={i} className="text-white/70 text-sm leading-relaxed">
                      <RichText text={line} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="px-6 pb-6 flex items-center justify-between gap-4">
                <button
                  onClick={goPrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white disabled:opacity-20 transition-colors border border-white/10 hover:border-white/30"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  {l === 'ar' ? 'السابق' : l === 'tr' ? 'Önceki' : 'Previous'}
                </button>

                {currentStep < totalSteps - 1 ? (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-kim-gold text-kim-navy-dark hover:bg-kim-gold/90 transition-colors"
                  >
                    {l === 'ar' ? 'التالي' : l === 'tr' ? 'Sonraki' : 'Next Step'}
                    {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-kim-gold text-kim-navy-dark hover:bg-kim-gold/90 transition-colors"
                  >
                    {l === 'ar' ? 'تواصل مع كيم' : l === 'tr' ? 'KİM ile İletişime Geç' : 'Contact KIM Foundation'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
