import {
  NewsArticle,
  Reporter,
  PrivateAd,
  AdSenseConfig,
  UserFeedback,
  NotificationItem,
  PortalBranding,
} from './types';

export const ADMIN_USERNAME = 'Admin';
export const ADMIN_PASSWORD = 'Bchakriraju1992@';

export const DEFAULT_LOGO_URL = '/assets/aistudio/___________Tricolour_News_Logo__1__1507f5db.png';

export const INITIAL_BRANDING: PortalBranding = {
  logoUrl: DEFAULT_LOGO_URL,
  bannerUrl: '',
  siteName: 'నేటి భారతం',
  tagline: 'ప్రజా గొంతుక - నిష్పక్షపాత సత్య వార్తలు',
};

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'art-101',
    title: {
      te: 'విజయవాడ నగరంలో ఆధునిక ఎలివేటెడ్ ఫ్లైఓవర్ ప్రారంభం: ట్రాఫిక్ కష్టాలకు చెక్',
      en: 'Modern Elevated Flyover Inaugurated in Vijayawada: Major Relief for Commuters',
      hi: 'विजयवाड़ा में नए एलिवेटेड फ्लाईओवर का उद्घाटन: जाम से मिलेगी मुक्ति'
    },
    summary: {
      te: 'బెజవాడ బెంజ్ సర్కిల్ నుంచి రామవరప్పాడు వరకు ట్రాఫిక్ సమస్యలను తీర్చేందుకు నిర్మించిన నూతన ఫ్లైఓవర్‌ను మంత్రుల బృందం ప్రారంభించింది.',
      en: 'Ministers inaugurated the new flyover extending connectivity from Benz Circle to Ramavarappadu.',
      hi: 'बेंज़ सर्कल से रामवरप्पाडु तक आवागमन को सुगम बनाने वाले नए फ्लाईओवर का शुभारंभ किया गया।'
    },
    content: {
      te: `విజయవాడ నగర ప్రజలకు ట్రాఫిక్ కష్టాల నుంచి విముక్తి కల్పించేందుకు నూతన ఎలివేటెడ్ ఫ్లైఓవర్‌ను ఘనంగా ప్రారంభించారు. అత్యాధునిక సాంకేతిక పరిజ్ఞానంతో రూ. 450 కోట్ల వ్యయంతో ఈ ఫ్లైఓవర్‌ను రికార్డు సమయంలో పూర్తి చేశారు. 

ఈ సందర్భంగా ప్రజా ప్రతినిధులు మాట్లాడుతూ, నగరంలో పెరుగుతున్న ట్రాఫిక్ అవసరాలకు అనుగుణంగా మౌలిక వసతుల కల్పన దిశగా ప్రభుత్వం చిత్తశుద్ధితో పనిచేస్తుందన్నారు. ఈ ఫ్లైఓవర్ అందుబాటులోకి రావడం వల్ల బెంజ్ సర్కిల్, బందరు రోడ్డు ప్రాంతాల్లో గంటల తరబడి నిలిచిపోయే ట్రాఫిక్‌కు శాశ్వత పరిష్కారం దొరుకుతుందని హర్షం వ్యక్తం చేశారు.`,
      en: `A state-of-the-art elevated corridor was officially inaugurated in Vijayawada to ease urban congestion. Built at a cost of Rs 450 crores with cutting-edge engineering, the flyover bridges vital transit points between national highways and city centers.`,
      hi: `विजयवाड़ा शहर में आधुनिक एलिवेटेड फ्लाईओवर का उद्घाटन किया गया, जिससे स्थानीय निवासियों और यात्रियों को भारी ट्रैफिक जाम से बड़ी राहत मिलेगी।`
    },
    category: 'mandal',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'కృష్ణా (Krishna)',
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
    imageUrl: 'https://picsum.photos/seed/vja-flyover/900/550',
    galleryUrls: [
      'https://picsum.photos/seed/vja-bridge1/800/500',
      'https://picsum.photos/seed/vja-bridge2/800/500'
    ],
    views: 3420,
    publishedAt: '2026-11-01T14:30:00Z',
    authorName: 'రామకృష్ణ శర్మ (R.K. Sharma)',
    authorRole: 'Reporter',
    authorMandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
    reporterId: 'rep-01',
    isBreaking: true,
    status: 'published'
  },
  {
    id: 'art-102',
    title: {
      te: 'ఇస్రో సరికొత్త విజయం: నింగిలోకి దూసుకెళ్లిన తదుపరి తరం సమాచార ఉపగ్రహం',
      en: 'ISRO Milestone: Advanced Communication Satellite Successfully Placed in Orbit',
      hi: 'इसरो की ऐतिहासिक सफलता: अगली पीढ़ी का संचार उपग्रह अंतरिक्ष में स्थापित'
    },
    summary: {
      te: 'శ్రీహరికోట సతీష్ ధావన్ స్పేస్ సెంటర్ నుంచి ప్రయోగించిన రాకెట్ ఉపగ్రహాన్ని నిర్ణీత కక్ష్యలోకి విజయవంతంగా చేర్చింది.',
      en: 'The next-generation satellite was flawlessly launched into its intended geosynchronous transfer orbit from Sriharikota.',
      hi: 'श्रीहरिकोटा अंतरिक्ष केंद्र से भारी उपग्रह को सफलतापूर्वक प्रक्षेपित कर अंतरिक्ष में स्थापित किया गया।'
    },
    content: {
      te: `భారత అంతరిక్ష పరిశోధన సంస్థ (ఇస్రో) మరో అద్భుతమైన విజయాన్ని తన ఖాతాలో వేసుకుంది. అత్యంత బరువైన నూతన తరం కమ్యూనికేషన్ ఉపగ్రహాన్ని సతీష్ ధావన్ స్పేస్ సెంటర్ నుంచి ప్రయోగించి, కచ్చితమైన కక్ష్యలో ప్రవేశపెట్టారు.

ఈ ఉపగ్రహం ద్వారా దేశవ్యాప్తంగా మారుమూల గ్రామాలు, ద్వీపకల్ప ప్రాంతాలలో కూడా హైస్పీడ్ ఇంటర్నెట్ మరియు టెలిమెడిసిన్ సేవలు మరింత వేగవంతం కానున్నాయి. శాస్త్రవేత్తల బృందాన్ని ప్రధాని మరియు రాష్ట్రాల ముఖ్యమంత్రులు అభినందించారు.`,
      en: `The Indian Space Research Organisation (ISRO) achieved another stellar milestone with the pinpoint orbital injection of its advanced communication satellite from Sriharikota.`,
      hi: `भारतीय अंतरिक्ष अनुसंधान संगठन (इसरो) ने आज एक और कीर्तिमान स्थापित करते हुए उच्च क्षमता वाले संचार उपग्रह का सफल प्रक्षेपण किया।`
    },
    category: 'national',
    state: 'అఖిల భారతం (All India)',
    district: 'అన్ని జిల్లాలు',
    mandal: 'అన్ని మండలాలు',
    imageUrl: 'https://picsum.photos/seed/isro-launch/900/550',
    youtubeUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    views: 8950,
    publishedAt: '2026-11-01T12:15:00Z',
    authorName: 'నేటి భారతం సెంట్రల్ డెస్క్',
    authorRole: 'Admin',
    isBreaking: true,
    status: 'published'
  },
  {
    id: 'art-103',
    title: {
      te: 'హైదరాబాద్ శేరిలింగంపల్లిలో గ్రీన్ మొబిలిటీ కారిడార్: 50 కొత్త ఎలక్ట్రిక్ బస్సులు',
      en: 'Green Mobility Corridor in Hyderabad Serilingampally: 50 New EV Buses Launched',
      hi: 'हैदराबाद सेरिलिंगमपल्ली में हरित क्रांति: 50 नई इलेक्ट्रिक बसों का शुभारंभ'
    },
    summary: {
      te: 'ఐటీ కారిడార్ ఉద్యోగులకు కాలుష్య రహిత ప్రయాణం అందించేందుకు ప్రభుత్వం అత్యాధునిక ఈవీ బస్సులను ప్రవేశపెట్టింది.',
      en: 'Environment-friendly EV bus fleet deployed across Financial District and Gachibowli to combat carbon emissions.',
      hi: 'आईटी कॉरिडोर में काम करने वाले कर्मचारियों के लिए प्रदूषण मुक्त सफर हेतु अत्याधुनिक इलेक्ट्रिक बसें शुरू की गईं।'
    },
    content: {
      te: `హైదరాబాద్ శేరిలింగంపల్లి, గచ్చిబౌలి, ఫైనాన్షియల్ డిస్ట్రిక్ట్ పరిధిలో కాలుష్యాన్ని అరికట్టేందుకు 50 సరికొత్త ఎయిర్ కండిషన్డ్ ఎలక్ట్రిక్ బస్సులను రవాణా శాఖ మంత్రి ప్రారంభించారు.

ఈ బస్సులలో జీపీఎస్ ట్రాకింగ్, మహిళల రక్షణ కోసం సీసీ కెమెరాలు, పానిక్ బటన్లు మరియు ఉచిత వైఫై సదుపాయాలు కల్పించారు. ప్రతి 5 నిమిషాలకు ఒక బస్సు అందుబాటులో ఉండేలా షెడ్యూల్ రూపొందించారు.`,
      en: `To curb pollution in Hyderabad's premier IT hub, the Transport Department flagged off 50 cutting-edge zero-emission electric buses connecting Serilingampally and metro terminuses.`,
      hi: `साइबराबाद और सेरिलिंगमपल्ली क्षेत्र में हरित परिवहन को बढ़ावा देने के लिए 50 वातानुकूलित ई-बसें सड़कों पर उतारी गईं।`
    },
    category: 'mandal',
    state: 'తెలంగాణ (Telangana)',
    district: 'రంగారెడ్డి (Rangareddy)',
    mandal: 'శేరిలింగంపల్లి (Serilingampally)',
    imageUrl: 'https://picsum.photos/seed/ev-buses/900/550',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    views: 4120,
    publishedAt: '2026-11-01T11:00:00Z',
    authorName: 'కె. సురేష్ కుమార్ (K. Suresh)',
    authorRole: 'Reporter',
    authorMandal: 'శేరిలింగంపల్లి (Serilingampally)',
    reporterId: 'rep-02',
    status: 'published'
  },
  {
    id: 'art-104',
    title: {
      te: 'మంగళగిరి చేనేత కార్మికులకు నూతన మార్కెటింగ్ పాలసీ: గ్లోబల్ ఈ-కామర్స్ ప్లాట్‌ఫామ్',
      en: 'Mangalagiri Handloom Weavers Get Global E-Commerce Export Platform',
      hi: 'मंगलगिरि हथकरघा बुनकरों के लिए वैश्विक निर्यात पोर्टल शुरू'
    },
    summary: {
      te: 'ప్రపంచ ప్రసిద్ధి గాంచిన మంగళగిరి పట్టు, కాటన్ చీరలను అంతర్జాతీయ మార్కెట్లకు నేరుగా అనుసంధానించే నూతన విధానం అమల్లోకి వచ్చింది.',
      en: 'Direct-to-consumer digital channels established to ensure fair prices and international reach for Mangalagiri weavers.',
      hi: 'मंगलगिरि की प्रसिद्ध साड़ियों को सीधे वैश्विक ग्राहकों तक पहुंचाने के लिए डिजिटल मंच की शुरुआत की गई।'
    },
    content: {
      te: `గుంటూరు జిల్లా మంగళగిరి మండల చేనేత కళాకారుల శ్రమకు తగిన గుర్తింపు, గరిష్ట ఆదాయం తెచ్చేందుకు ప్రభుత్వం ప్రత్యేక ఈ-కామర్స్ కార్యక్రమాన్ని ప్రారంభించింది.

ఈ పథకం ద్వారా దళారుల ప్రమేయం లేకుండా నేరుగా వినియోగదారులకు నాణ్యమైన చేనేత వస్త్రాలు సరఫరా కానున్నాయి. సుమారు 10,000 చేనేత కుటుంబాలకు డిజిటల్ శిక్షణ మరియు ఆర్థిక సాయం అందించనున్నారు.`,
      en: `The state government has announced a comprehensive export linkage initiative for the weavers of Mangalagiri, enabling traditional artisans to sell authentic handloom cotton directly worldwide.`,
      hi: `मंगलगिरि मंडल के बुनकरों को बिचौलियों से मुक्त कर उनकी कला को वैश्विक स्तर पर सीधे बेचने की सुविधा उपलब्ध कराई गई है।`
    },
    category: 'mandal',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'గుంటూరు (Guntur)',
    mandal: 'మంగళగిరి (Mangalagiri)',
    imageUrl: 'https://picsum.photos/seed/handloom/900/550',
    views: 2890,
    publishedAt: '2026-11-01T09:45:00Z',
    authorName: 'జి. వెంకట్ రావు',
    authorRole: 'Reporter',
    authorMandal: 'మంగళగిరి (Mangalagiri)',
    status: 'published'
  },
  {
    id: 'art-105',
    title: {
      te: 'రైతులకు తీపి కబురు: పంట రుణాల రాయితీ నిధులు నేరుగా రైతుల ఖాతాల్లోకి జమ',
      en: 'Good News for Farmers: Crop Subsidy Disbursed Directly to Bank Accounts',
      hi: 'किसानों के लिए खुशखबरी: फसल अनुदान राशि सीधे बैंक खातों में अंतरित'
    },
    summary: {
      te: 'ఖరీఫ్ సీజన్ ముగింపు వేళ రాష్ట్ర వ్యాప్తంగా లక్షలాది మంది అన్నదాతల బ్యాంక్ ఖాతాల్లో పెట్టుబడి సాయం నిధులు విడుదలయ్యాయి.',
      en: 'Kharif season support credits delivered seamlessly via DBT to over 45 lakh agricultural producers.',
      hi: 'खरीफ सीजन के लिए राज्य भर के लाखों किसानों के खातों में डीबीटी के जरिए सहायता राशि भेजी गई।'
    },
    content: {
      te: `వ్యవసాయ రంగాన్ని ఆదుకోవడంలో భాగంగా పంట పెట్టుబడి సాయం మరియు విత్తన రాయితీ నిధులను ముఖ్యమంత్రి బటన్ నొక్కి రైతుల ఖాతాల్లోకి జమ చేశారు.

రైతులు ఎవరినీ ఆశ్రయించాల్సిన పనిలేకుండా పారదర్శక పద్ధతిలో ఆధార్ ఆధారిత పేమెంట్ విధానం ద్వారా ఈ నిధులు నేరుగా చేరాయని అధికారులు వెల్లడించారు. సమయానికి అందిన సాయం పట్ల రైతు సంఘాలు హర్షం వ్యక్తం చేశాయి.`,
      en: `Agricultural subsidy funds under the direct benefit transfer mechanism were disbursed to empower farming households across districts before the rabi planning cycle.`,
      hi: `कृषि कल्याण योजना के अंतर्गत राज्य के किसानों को बिना किसी बिचौलिये के सीधे बैंक खातों में सहायता राशि प्रदान की गई।`
    },
    category: 'agriculture',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'అన్ని జిల్లాలు',
    mandal: 'అన్ని మండలాలు',
    imageUrl: 'https://picsum.photos/seed/farmers-crops/900/550',
    views: 6340,
    publishedAt: '2026-11-01T07:30:00Z',
    authorName: 'అగ్రికల్చర్ డెస్క్',
    authorRole: 'Admin',
    isBreaking: true,
    status: 'published'
  },
  {
    id: 'art-106',
    title: {
      te: 'వరంగల్ కాకతీయ ఉత్సవాలు ఘనంగా ప్రారంభం: వెల్లివిరిసిన చారిత్రక వైభవం',
      en: 'Kakatiya Heritage Festival Begins with Splendor in Warangal',
      hi: 'वारंगल में काकतीय विरासत महोत्सव का भव्य शुभारंभ'
    },
    summary: {
      te: 'వేయి స్తంభాల గుడి మరియు రామప్ప దేవాలయం వద్ద ప్రత్యేక సాంస్కృతిక ప్రదర్శనలు, లేజర్ షోలు నిర్వహించారు.',
      en: 'Enchanting cultural performances and light shows draw thousands to historic Kakatiya monuments.',
      hi: 'हजार स्तंभ मंदिर और रामप्पा मंदिर में भव्य सांस्कृतिक प्रस्तुतियां आयोजित की गईं।'
    },
    content: {
      te: `చారిత్రక నగరమైన వరంగల్ లో కాకతీయ సాంస్కృతిక ఉత్సవాలు అంగరంగ వైభవంగా మొదలయ్యాయి. రామప్ప దేవాలయం మరియు వేయి స్తంభాల గుడి పరిసరాలు విద్యుత్ దీపాలంకరణలతో దేదీప్యమానంగా వెలిగిపోతున్నాయి.

దేశ నలుమూలల నుంచి వచ్చిన ప్రసిద్ధ శాస్త్రీయ నృత్య కళాకారులు పేరిణి శివతాండవం, కూచిపూడి నృత్యాలను ప్రదర్శించి ప్రేక్షకులను మంత్రముగ్ధులను చేశారు.`,
      en: `The annual Kakatiya Cultural Festival opened with dazzling light shows and Perini Sivatandavam classical recitals at historic sites across Warangal and Hanamkonda.`,
      hi: `वारंगल के ऐतिहासिक स्थलों पर काकतीय सांस्कृतिक उत्सव का रंगारंग आयोजन हुआ, जिसमें देशभर के कलाकारों ने हिस्सा लिया।`
    },
    category: 'mandal',
    state: 'తెలంగాణ (Telangana)',
    district: 'వరంగల్ (Warangal)',
    mandal: 'హనుమకొండ (Hanamkonda)',
    imageUrl: 'https://picsum.photos/seed/kakatiya-heritage/900/550',
    youtubeUrl: 'https://www.youtube.com/watch?v=7WT9q33Q58c',
    views: 3100,
    publishedAt: '2026-10-31T18:00:00Z',
    authorName: 'పి. రాజేందర్',
    authorRole: 'Reporter',
    authorMandal: 'హనుమకొండ (Hanamkonda)',
    status: 'published'
  }
];

export const INITIAL_REPORTERS: Reporter[] = [
  {
    id: 'rep-01',
    fullName: 'రామకృష్ణ శర్మ (R.K. Sharma)',
    username: 'ramakrishna',
    password: 'Password@123',
    mobile: '9848022338',
    email: 'rk.sharma.reporter@gmail.com',
    address: 'ఫ్లాట్ 302, గాయత్రి టవర్స్, బెంజ్ సర్కిల్, విజయవాడ',
    pincode: '520010',
    bloodGroup: 'O+',
    designation: 'సీనియర్ మండల కరస్పాండెంట్ (Senior Mandal Correspondent)',
    emergencyContact: '9848011222',
    education: 'ఎం.ఏ జర్నలిజం (MA Journalism)',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'కృష్ణా (Krishna)',
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
    photoUrl: 'https://picsum.photos/seed/reporter-rk/200/200',
    aadhaarNumber: 'XXXX-XXXX-9012',
    aadhaarDocUrl: 'https://picsum.photos/seed/aadhaar-doc1/400/250',
    status: 'approved',
    registeredAt: '2026-10-15T08:00:00Z',
    approvedAt: '2026-10-15T10:30:00Z',
    idCardNumber: 'NB-REP-AP-KRI-001'
  },
  {
    id: 'rep-02',
    fullName: 'కె. సురేష్ కుమార్ (K. Suresh)',
    username: 'suresh_hyd',
    password: 'Password@123',
    mobile: '9849033445',
    email: 'suresh.reporter.hyd@gmail.com',
    address: 'ఇంటి నం. 4-82, చందానగర్ మెయిన్ రోడ్డు, శేరిలింగంపల్లి, హైదరాబాద్',
    pincode: '500050',
    bloodGroup: 'B+',
    designation: 'మండల ప్రత్యేక ప్రతినిధి (Special Mandal Correspondent)',
    emergencyContact: '9849011999',
    education: 'బి.ఏ (BA), డిప్లొమా ఇన్ మాస్ కమ్యూనికేషన్',
    state: 'తెలంగాణ (Telangana)',
    district: 'రంగారెడ్డి (Rangareddy)',
    mandal: 'శేరిలింగంపల్లి (Serilingampally)',
    photoUrl: 'https://picsum.photos/seed/reporter-suresh/200/200',
    aadhaarNumber: 'XXXX-XXXX-4567',
    aadhaarDocUrl: 'https://picsum.photos/seed/aadhaar-doc2/400/250',
    status: 'approved',
    registeredAt: '2026-10-20T09:00:00Z',
    approvedAt: '2026-10-20T11:00:00Z',
    idCardNumber: 'NB-REP-TS-RRD-002'
  },
  {
    id: 'rep-03',
    fullName: 'జి. వెంకట్ రావు (G. Venkat Rao)',
    username: 'venkat_gnt',
    password: 'Password@123',
    mobile: '9988776655',
    email: 'venkat.gnt@gmail.com',
    address: 'డోర్ నం. 2-15, పాత బస్టాండ్ వీధి, మంగళగిరి',
    pincode: '522503',
    bloodGroup: 'A+',
    designation: 'క్షేత్ర స్థాయి రిపోర్టర్ (Field Reporter)',
    emergencyContact: '9988776600',
    education: 'డిగ్రీ (B.Com)',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'గుంటూరు (Guntur)',
    mandal: 'మంగళగిరి (Mangalagiri)',
    photoUrl: 'https://picsum.photos/seed/reporter-venkat/200/200',
    aadhaarNumber: 'XXXX-XXXX-8899',
    aadhaarDocUrl: 'https://picsum.photos/seed/aadhaar-doc3/400/250',
    status: 'pending',
    registeredAt: '2026-11-01T06:00:00Z',
    idCardNumber: 'NB-REP-PENDING-003'
  }
];

export const INITIAL_ADS: PrivateAd[] = [
  {
    id: 'ad-01',
    title: 'విజయవాడ గుణదల రోడ్డులో ప్రీమియం 2&3 BHK ఫ్లాట్లు అమ్మబడును',
    category: 'real_estate',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'కృష్ణా (Krishna)',
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
    bannerUrl: 'https://picsum.photos/seed/ad-apartments/700/350',
    advertiserName: 'శ్రీ సాయి రియల్ ఎస్టేట్స్ & డెవలపర్స్',
    contactPhone: '9848011223',
    contactWhatsApp: '9848011223',
    description: '100% వాస్తు, 24/7 సెక్యూరిటీ, స్విమ్మింగ్ పూల్, క్లబ్ హౌస్, బ్యాంక్ లోన్ సౌకర్యం కలదు.',
    validTill: '2026-12-31',
    status: 'approved',
    submittedAt: '2026-10-25T10:00:00Z'
  },
  {
    id: 'ad-02',
    title: 'హైదరాబాద్ మాదాపూర్‌లో అర్జెంట్‌గా సేల్స్ & టెలికాలర్స్ కావలెను',
    category: 'jobs',
    state: 'తెలంగాణ (Telangana)',
    district: 'రంగారెడ్డి (Rangareddy)',
    mandal: 'శేరిలింగంపల్లి (Serilingampally)',
    bannerUrl: 'https://picsum.photos/seed/ad-jobs/700/350',
    advertiserName: 'టెక్ విజన్ సొల్యూషన్స్',
    contactPhone: '9988112233',
    contactWhatsApp: '9988112233',
    description: 'జీతం రూ. 25,000 నుండి 40,000 + ఇన్సెంటివ్స్. ఫ్రెషర్స్ మరియు అనుభవం ఉన్నవారు సంప్రదించండి.',
    validTill: '2026-12-15',
    status: 'approved',
    submittedAt: '2026-10-28T14:00:00Z'
  },
  {
    id: 'ad-03',
    title: 'మంగళగిరి నూతన చేనేత దుకాణం ప్రారంభోత్సవం - 20% ప్రత్యేక తగ్గింపు',
    category: 'business',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'గుంటూరు (Guntur)',
    mandal: 'మంగళగిరి (Mangalagiri)',
    bannerUrl: 'https://picsum.photos/seed/ad-textiles/700/350',
    advertiserName: 'లక్ష్మి హ్యాండ్‌లూమ్స్',
    contactPhone: '9440123456',
    contactWhatsApp: '9440123456',
    description: 'స్వచ్ఛమైన పట్టు మరియు కాటన్ చీరలపై ప్రత్యేక పండుగ ఆఫర్లు కలవు.',
    validTill: '2026-11-30',
    status: 'approved',
    submittedAt: '2026-10-30T09:00:00Z'
  },
  {
    id: 'ad-04',
    title: 'తెనాలిలో కమర్షియల్ షాప్ రెంట్‌కు లేదా లీజుకు ఇవ్వబడును',
    category: 'business',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'గుంటూరు (Guntur)',
    mandal: 'తెనాలి (Tenali)',
    bannerUrl: 'https://picsum.photos/seed/ad-shop/700/350',
    advertiserName: 'రమణ ప్రాపర్టీస్',
    contactPhone: '9849556677',
    contactWhatsApp: '9849556677',
    description: 'మెయిన్ రోడ్డు ఫేసింగ్ 1200 చదరపు అడుగులు, బ్యాంకులు లేదా షోరూంలకు అనుకూలం.',
    validTill: '2026-12-20',
    status: 'pending',
    submittedAt: '2026-11-01T08:00:00Z'
  }
];

export const INITIAL_ADSENSE: AdSenseConfig = {
  enabled: true,
  publisherId: 'ca-pub-9848012345678901',
  topBannerSlot: 'slot-banner-top-728x90',
  sidebarSlot: 'slot-sidebar-300x250',
  inFeedSlot: 'slot-infeed-native-fluid'
};

export const INITIAL_FEEDBACK: UserFeedback[] = [
  {
    id: 'fb-01',
    userName: 'శ్రీనివాస రావు',
    userPhone: '9848123450',
    rating: 5,
    type: 'content_quality',
    message: 'మా విజయవాడ అర్బన్ మండల వార్తలు చాలా సమగ్రంగా, వేగంగా అందిస్తున్నారు. అభినందనలు!',
    createdAt: '2026-10-31T15:20:00Z'
  },
  {
    id: 'fb-02',
    userName: 'అరుణ్ వర్మ',
    userPhone: '9900112233',
    rating: 4,
    type: 'suggestion',
    message: 'మరిన్ని యూట్యూబ్ లైవ్ వీడియో బులెటిన్లు అందిస్తే మరింత బాగుంటుంది.',
    createdAt: '2026-11-01T09:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'తాజా ముఖ్యాంశం: విజయవాడ ఎలివేటెడ్ ఫ్లైఓవర్ ప్రారంభం',
    summary: 'బెంజ్ సర్కిల్ నుంచి ట్రాఫిక్ సమస్యలకు శాశ్వత ఉపశమనం లభించింది.',
    timestamp: '10 నిమిషాల క్రితం',
    articleId: 'art-101',
    type: 'breaking',
    read: false
  },
  {
    id: 'notif-2',
    title: 'ఇస్రో కొత్త ఉపగ్రహ ప్రయోగం విజయవంతం',
    summary: 'శ్రీహరికోట నుంచి రోదసిలోకి దూసుకెళ్లిన రాకెట్.',
    timestamp: '2 గంటల క్రితం',
    articleId: 'art-102',
    type: 'breaking',
    read: false
  },
  {
    id: 'notif-3',
    title: 'హైదరాబాద్ శేరిలింగంపల్లిలో 50 కొత్త ఈవీ బస్సులు ప్రారంభం',
    summary: 'ఐటీ కారిడార్ ఉద్యోగులకు కాలుష్య రహిత ప్రయాణం.',
    timestamp: '3 గంటల క్రితం',
    articleId: 'art-103',
    type: 'mandal',
    read: true
  }
];

const STORAGE_KEYS = {
  ARTICLES: 'neti_bharatham_articles_v1',
  REPORTERS: 'neti_bharatham_reporters_v1',
  ADS: 'neti_bharatham_ads_v1',
  ADSENSE: 'neti_bharatham_adsense_v1',
  FEEDBACK: 'neti_bharatham_feedback_v1',
  CURRENT_REPORTER: 'neti_bharatham_logged_in_reporter_v1',
  NOTIFICATIONS: 'neti_bharatham_notifications_v1',
  BRANDING: 'neti_bharatham_branding_v1',
  ADMIN_PASSWORD: 'neti_bharatham_admin_password_v1',
};

export function getStoredArticles(): NewsArticle[] {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles: NewsArticle[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  } catch (e) {
    console.error('Failed to save articles to localStorage', e);
  }
}

export function getStoredReporters(): Reporter[] {
  if (typeof window === 'undefined') return INITIAL_REPORTERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REPORTERS, JSON.stringify(INITIAL_REPORTERS));
      return INITIAL_REPORTERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REPORTERS;
  }
}

export function saveStoredReporters(reporters: Reporter[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTERS, JSON.stringify(reporters));
  } catch (e) {
    console.error('Failed to save reporters', e);
  }
}

export function getStoredAds(): PrivateAd[] {
  if (typeof window === 'undefined') return INITIAL_ADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(INITIAL_ADS));
      return INITIAL_ADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ADS;
  }
}

export function saveStoredAds(ads: PrivateAd[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
  } catch (e) {
    console.error('Failed to save ads', e);
  }
}

export function getStoredAdSense(): AdSenseConfig {
  if (typeof window === 'undefined') return INITIAL_ADSENSE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADSENSE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADSENSE, JSON.stringify(INITIAL_ADSENSE));
      return INITIAL_ADSENSE;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ADSENSE;
  }
}

export function saveStoredAdSense(cfg: AdSenseConfig) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ADSENSE, JSON.stringify(cfg));
  } catch (e) {
    console.error('Failed to save AdSense config', e);
  }
}

export function getStoredFeedback(): UserFeedback[] {
  if (typeof window === 'undefined') return INITIAL_FEEDBACK;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
      return INITIAL_FEEDBACK;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FEEDBACK;
  }
}

export function saveStoredFeedback(fb: UserFeedback[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(fb));
  } catch (e) {
    console.error('Failed to save feedback', e);
  }
}

export function getStoredNotifications(): NotificationItem[] {
  if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveStoredNotifications(notifs: NotificationItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  } catch (e) {
    console.error('Failed to save notifications', e);
  }
}

export function getStoredBranding(): PortalBranding {
  if (typeof window === 'undefined') return INITIAL_BRANDING;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRANDING);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(INITIAL_BRANDING));
      return INITIAL_BRANDING;
    }
    const parsed: PortalBranding = JSON.parse(raw);
    // If stored logo is the previous placeholder '/icon.svg', automatically upgrade to new official logo
    if (parsed.logoUrl === '/icon.svg' || !parsed.logoUrl) {
      parsed.logoUrl = DEFAULT_LOGO_URL;
      localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return INITIAL_BRANDING;
  }
}

export function saveStoredBranding(branding: PortalBranding) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(branding));
  } catch (e) {
    console.error('Failed to save branding', e);
  }
}

export function getStoredAdminPassword(): string {
  if (typeof window === 'undefined') return ADMIN_PASSWORD;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, ADMIN_PASSWORD);
      return ADMIN_PASSWORD;
    }
    return raw;
  } catch {
    return ADMIN_PASSWORD;
  }
}

export function saveStoredAdminPassword(password: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, password);
  } catch (e) {
    console.error('Failed to save admin password', e);
  }
}


