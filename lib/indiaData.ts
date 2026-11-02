import { LocationHierarchy } from './types';

// Complete Administrative Reference Directory based on official 2022 AP Reorganization (26 Districts)
// and Telangana Reorganization (33 Districts) from official directories.

export const AP_26_DISTRICTS: Record<string, string[]> = {
  'అల్లూరి సీతారామరాజు (Alluri Sitharama Raju)': [
    'పాడేరు (Paderu)',
    'అరకు వ్యాలీ (Araku Valley)',
    'అనంతగిరి (Ananthagiri)',
    'చింతపల్లి (Chintapalle)',
    'డుంబ్రిగూడ (Dumbriguda)',
    'జి. మాడుగుల (G. Madugula)',
    'గూడెం కొత్త వీధి (Gudem Kotha Veedhi)',
    'హుకుంపేట (Hukumpeta)',
    'కొయ్యూరు (Koyyuru)',
    'ముంచింగిపుట్టు (Munchingi Puttu)',
    'పెదబయలు (Pedabayalu)',
    'రంపచోడవరం (Rampachodavaram)',
    'అడ్డతీగల (Addateegala)',
    'దేవీపట్నం (Devipatnam)',
    'గంగవరం (Gangavaram)',
    'మారేడుమిల్లి (Maredumilli)',
    'రాజవొమ్మంగి (Rajavommangi)',
    'వై. రామవరం (Y. Ramavaram)',
    'చింతూరు (Chinturu)',
    'ఎటపాక (Etapaka)',
    'కూనవరం (Kunavaram)',
    'వరరామచంద్రపురం (Vararamachandrapuram)'
  ],
  'అనకాపల్లి (Anakapalli)': [
    'అనకాపల్లి (Anakapalli)',
    'అచ్యుతాపురం (Atchutapuram)',
    'బుచ్చెయ్యపేట (Butchayyapeta)',
    'చోడవరం (Chodavaram)',
    'దేవరపల్లి (Devarapalli)',
    'ఎలమంచిలి (Elamanchili)',
    'కె. కోటపాడు (K. Kotapadu)',
    'కాశీంకోట (Kasimkota)',
    'మునగపాక (Munagapaka)',
    'పరవాడ (Paravada)',
    'రాంబిల్లి (Rambilli)',
    'సబ్బవరం (Sabbavaram)',
    'నర్సీపట్నం (Narsipatnam)',
    'చీడికాడ (Cheedikada)',
    'గొలుగొండ (Golugonda)',
    'కోటవురట్ల (Kotauratla)',
    'మాడుగుల (Madugula)',
    'మాకవరపాలెం (Makavarapalem)',
    'నక్కపల్లి (Nakkapalle)',
    'నాథవరం (Nathavaram)',
    'పాయకరావుపేట (Payakaraopeta)',
    'రావికమతం (Ravikamatham)',
    'రోలుగుంట (Rolugunta)',
    'సర్వసిద్ధి రాయవరం (Sarvasiddhi Rayavaram)'
  ],
  'అనంతపురము (Anantapuramu)': [
    'అనంతపురం అర్బన్ (Anantapur Urban)',
    'అనంతపురం రూరల్ (Anantapur Rural)',
    'ఆత్మకూరు (Atmakur)',
    'బుక్కరాయసముద్రం (Bukkarayasamudram)',
    'గార్లదిన్నె (Garladinne)',
    'కూడేరు (Kudair)',
    'నార్పల (Narpala)',
    'పెద్దపప్పూరు (Peddapappur)',
    'పుట్లూరు (Putlur)',
    'రాప్తాడు (Raptadu)',
    'సింగనమల (Singanamala)',
    'తాడిపత్రి (Tadipatri)',
    'యల్లనూరు (Yellanur)',
    'గుంతకల్లు (Guntakal)',
    'గుత్తి (Gooty)',
    'పామిడి (Pamidi)',
    'పెద్దవడుగూరు (Peddavadugur)',
    'ఉరవకొండ (Uravakonda)',
    'వజ్రకరూరు (Vajrakarur)',
    'విడపనకల్లు (Vidapanakal)',
    'యాదికి (Yadiki)',
    'కళ్యాణదుర్గం (Kalyandurg)',
    'బెలుగుప్ప (Beluguppa)',
    'బొమ్మనహాళ్ (Bommanahal)',
    'బ్రహ్మసముద్రం (Brahmasamudram)',
    'డి. హిరేహాళ్ (D. Hirehal)',
    'గుమ్మఘట్ట (Gummagatta)',
    'కంబదూరు (Kambadur)',
    'కణేకల్లు (Kanekal)',
    'కుందుర్పి (Kundurpi)',
    'రాయదుర్గం (Rayadurg)',
    'శెట్టూరు (Setturu)'
  ],
  'అన్నమయ్య (Annamayya)': [
    'రాయచోటి (Rayachoti)',
    'చిన్నమండెం (Chinnamandyam)',
    'గాలివీడు (Galiveedu)',
    'గుర్రంకొండ (Gurramkonda)',
    'కలకడ (Kalakada)',
    'కంబంవారిపల్లె (Kambhamvaripalle)',
    'లక్కిరెడ్డిపల్లె (Lakkireddipalle)',
    'పీలేరు (Pileru)',
    'రామాపురం (Ramapuram)',
    'సాంబెపల్లి (Sambepalli)',
    'మదనపల్లె (Madanapalle)',
    'బీరంగి కొత్తకోట (Beerangi Kothakota)',
    'కలికిరి (Kalikiri)',
    'కురబలకోట (Kurabalakota)',
    'ములకలచెరువు (Mulakalacheruvu)',
    'నిమ్మనపల్లె (Nimmanapalle)',
    'పెద్దమండ్యం (Peddamandyam)',
    'పెద్దతిప్పసముద్రం (Peddathippasamudram)',
    'రామసముద్రం (Ramasamudram)',
    'తంబళ్లపల్లె (Thamballapalle)',
    'వాల్మీకిపురం (Valmiki Puram)',
    'రాజంపేట (Rajampet)',
    'చిట్వేలు (Chitvel)',
    'కోడూరు (Kodur)',
    'నందలూరు (Nandalur)',
    'ఓబులవారిపల్లె (Obulavaripalle)',
    'పెనగలూరు (Penagalur)',
    'పుల్లంపేట (Pullampeta)',
    'టి. సుండుపల్లె (T. Sundupalle)',
    'వీరబల్లి (Veeraballi)'
  ],
  'బాపట్ల (Bapatla)': [
    'బాపట్ల (Bapatla)',
    'కర్లపాలెం (Karlapalem)',
    'మార్టూరు (Martur)',
    'పర్చూరు (Parchur)',
    'పిట్టలవానిపాలెం (Pittalavanipalem)',
    'యద్దనపూడి (Yeddanapudi)',
    'చీరాల (Chirala)',
    'అద్దంకి (Addanki)',
    'బల్లికురవ (Ballikurava)',
    'చినగంజాం (Chinaganjam)',
    'ఇంకొల్లు (Inkollu)',
    'జనకవరం పంగులూరు (Janakavarampanguluru)',
    'కారంచేడు (Karamchedu)',
    'కోరిశపాడు (Korisapadu)',
    'సంతమాగులూరు (Santhamaguluru)',
    'వేటపాలెం (Vetapalem)',
    'రేపల్లె (Repalle)',
    'అమృతలూరు (Amruthalur)',
    'భట్టిప్రోలు (Bhattiprolu)',
    'చెరుకుపల్లి (Cherukupalle)',
    'కొల్లూరు (Kolluru)',
    'నగరం (Nagaram)',
    'నిజాంపట్నం (Nizampatnam)',
    'చుండూరు (Tsundur)',
    'వేమూరు (Vemuru)'
  ],
  'చిత్తూరు (Chittoor)': [
    'చిత్తూరు అర్బన్ (Chittoor Urban)',
    'చిత్తూరు రూరల్ (Chittoor Rural)',
    'గంగాధర నెల్లూరు (Gangadhara Nellore)',
    'గుడిపాల (Gudipala)',
    'ఐరాల (Irala)',
    'పెనుమూరు (Penumuru)',
    'పులిచెర్ల (Pulicherla)',
    'పూతలపట్టు (Puthalapattu)',
    'రొంపిచెర్ల (Rompicherla)',
    'శ్రీరంగరాజపురం (Srirangarajapuram)',
    'తవణంపల్లె (Thavanampalle)',
    'వేదురుకుప్పం (Vedurukuppam)',
    'యాదమరి (Yadamari)',
    'పుంగనూరు (Punganur)',
    'పలమనేరు (Palamaner)',
    'బైరెడ్డిపల్లె (Baireddipalle)',
    'బంగారుపాలెం (Bangarupalem)',
    'చౌడేపల్లె (Chowdepalle)',
    'గంగవరం (Gangavaram)',
    'పెద్దపంజాణి (Peddapanjani)',
    'సొడం (Sodam)',
    'సోమల (Somala)',
    'వెంకటగిరికోట (Venkatagirikota)',
    'కుప్పం (Kuppam)',
    'గుడుపల్లె (Gudupalle)',
    'రామకుప్పం (Ramakuppam)',
    'శాంతిపురం (Santhipuram)',
    'నగరి (Nagari)',
    'కార్వేటినగరం (Karvetinagar)',
    'నిండ్ర (Nindra)',
    'పాలసముద్రం (Palasamudram)',
    'విజయపురం (Vijayapuram)'
  ],
  'డా. బి.ఆర్. అంబేద్కర్ కోనసీమ (Dr. B.R. Ambedkar Konaseema)': [
    'అమలాపురం (Amalapuram)',
    'ఐనవిల్లి (Ainavilli)',
    'అల్లవరం (Allavaram)',
    'ఐ. పోలవరం (I. Polavaram)',
    'కాట్రేనికోన (Katrenikona)',
    'మలికిపురం (Malikipuram)',
    'మామిడికుదురు (Mamidikuduru)',
    'ముమ్మిడివరం (Mummidivaram)',
    'రాజోలు (Razole)',
    'సఖినేటిపల్లి (Sakhinetipalle)',
    'ఉప్పలగుప్తం (Uppalaguptam)',
    'కొత్తపేట (Kothapeta)',
    'ఆలమూరు (Alamuru)',
    'అంబాజీపేట (Ambajipeta)',
    'ఆత్రేయపురం (Atreyapuram)',
    'పి. గన్నవరం (P. Gannavaram)',
    'రావులపాలెం (Ravulapalem)',
    'రామచంద్రపురం (Ramachandrapuram)',
    'కె. గంగవరం (Gangavaram)',
    'కపిలేశ్వరపురం (Kapileswarapuram)',
    'మండపేట (Mandapeta)',
    'రాయవరం (Rayavaram)'
  ],
  'తూర్పు గోదావరి (East Godavari)': [
    'రాజమహేంద్రవరం అర్బన్ (Rajamahendravaram Urban)',
    'రాజమహేంద్రవరం రూరల్ (Rajamahendravaram Rural)',
    'అనపర్తి (Anaparthi)',
    'బిక్కవోలు (Biccavolu)',
    'గోకవరం (Gokavaram)',
    'కడియం (Kadiam)',
    'కోరుకొండ (Korukonda)',
    'రాజానగరం (Rajanagaram)',
    'రంగంపేట (Rangampeta)',
    'సీతానగరం (Seethanagaram)',
    'కొవ్వూరు (Kovvur)',
    'చాగల్లు (Chagallu)',
    'దేవరపల్లి (Devarapalle)',
    'గోపాలపురం (Gopalapuram)',
    'నల్లజర్ల (Nallajerla)',
    'నిడదవోలు (Nidadavole)',
    'పేరవలి (Peravali)',
    'తాళ్లపూడి (Tallapudi)',
    'ఉండ్రాజవరం (Undrajavaram)'
  ],
  'ఏలూరు (Eluru)': [
    'ఏలూరు (Eluru)',
    'భీమడోలు (Bhimadole)',
    'దెందులూరు (Denduluru)',
    'గణపవరం (Ganapavaram)',
    'కైకలూరు (Kaikalur)',
    'కలిదిండి (Kalidindi)',
    'మండవల్లి (Mandavalli)',
    'ముదినేపల్లి (Mudinepalli)',
    'నిడమర్రు (Nidamarru)',
    'పెదపాడు (Pedapadu)',
    'పెదవేగి (Pedavegi)',
    'ఉంగుటూరు (Unguturu)',
    'ఆగిరిపల్లి (Agiripalli)',
    'జంగారెడ్డిగూడెం (Jangareddygudem)',
    'బుట్టాయగూడెం (Buttayagudem)',
    'చింతలపూడి (Chintalapudi)',
    'జీలుగుమిల్లి (Jeelugumilli)',
    'కామవరపుకోట (Kamavarapukota)',
    'కొయ్యలగూడెం (Koyyalagudem)',
    'కుక్కునూరు (Kukunoor)',
    'లింగపాలెం (Lingapalem)',
    'పోలవరం (Polavaram)',
    'టి. నరసాపురం (T. Narasapuram)',
    'వేలేరుపాడు (Velerupadu)',
    'నూజివీడు (Nuzvid)',
    'చాట్రాయి (Chatrai)',
    'ముసునూరు (Musunuru)'
  ],
  'గుంటూరు (Guntur)': [
    'గుంటూరు తూర్పు (Guntur East)',
    'గుంటూరు పశ్చిమ (Guntur West)',
    'మేడికొండూరు (Medikonduru)',
    'పెదకాకాని (Pedakakani)',
    'పెదనందిపాడు (Pedanandipadu)',
    'ఫిరంగిపురం (Phirangipuram)',
    'ప్రత్తిపాడు (Prathipadu)',
    'తాడికొండ (Tadikonda)',
    'తుళ్లూరు (Thullur)',
    'వట్టిచెరుకూరు (Vatticherukuru)',
    'తెనాలి (Tenali)',
    'చేబ్రోలు (Chebrolu)',
    'దుగ్గిరాల (Duggirala)',
    'కాకుమాను (Kakumanu)',
    'కొల్లిపర (Kollipara)',
    'మంగళగిరి (Mangalagiri)',
    'పొన్నూరు (Ponnur)',
    'తాడేపల్లి (Tadepalle)'
  ],
  'కాకినాడ (Kakinada)': [
    'కాకినాడ అర్బన్ (Kakinada Urban)',
    'కాకినాడ రూరల్ (Kakinada Rural)',
    'గొల్లప్రోలు (Gollaprolu)',
    'కాజులూరు (Kajuluru)',
    'కరప (Karapa)',
    'కొత్తపల్లె (Kothapalle)',
    'పెదపూడి (Pedapudi)',
    'పిఠాపురం (Pithapuram)',
    'సామర్లకోట (Samalkota)',
    'తాళ్లరేవు (Thallarevu)',
    'పెద్దాపురం (Peddapuram)',
    'గండేపల్లి (Gandepalle)',
    'జగ్గంపేట (Jaggampeta)',
    'కిర్లంపూడి (Kirlampudi)',
    'కోటనందూరు (Kotananduru)',
    'ప్రత్తిపాడు (Prathipadu)',
    'రౌతులపూడి (Rowthulapudi)',
    'శంఖవరం (Sankhavaram)',
    'తొండంగి (Thondangi)',
    'తుని (Tuni)',
    'ఏలేశ్వరం (Yeleswaram)'
  ],
  'కృష్ణా (Krishna)': [
    'మచిలీపట్నం (Machilipatnam)',
    'అవనిగడ్డ (Avanigadda)',
    'బంటుమిల్లి (Bantumilli)',
    'చల్లపల్లి (Challapalli)',
    'ఘంటసాల (Ghantasala)',
    'గూడూరు (Guduru)',
    'కోడూరు (Koduru)',
    'కృత్తివెన్ను (Kruthivennu)',
    'మోపిదేవి (Mopidevi)',
    'నాగాయలంక (Nagayalanka)',
    'పెడన (Pedana)',
    'గుడ్లవల్లేరు (Gudlavalleru)',
    'గుడివాడ (Gudivada)',
    'బాపులపాడు (Bapulapadu)',
    'గన్నవరం (Gannavaram)',
    'నందివాడ (Nandivada)',
    'పెదపారుపూడి (Pedaparupudi)',
    'ఉంగుటూరు (Unguturu)',
    'ఉయ్యూరు (Vuyyuru)',
    'కంకిపాడు (Kankipadu)',
    'మొవ్వ (Movva)',
    'పామర్రు (Pamarru)',
    'పామిడిముక్కల (Pamidimukkala)',
    'పెనమలూరు (Penamaluru)',
    'తోట్లవల్లూరు (Thotlavalluru)'
  ],
  'కర్నూలు (Kurnool)': [
    'కర్నూలు అర్బన్ (Kurnool Urban)',
    'కర్నూలు రూరల్ (Kurnool Rural)',
    'సి. బెళగల్ (C. Belagal)',
    'గూడూరు (Gudur)',
    'కల్లూరు (Kallur)',
    'కోడుమూరు (Kodumur)',
    'ఓర్వకల్లు (Orvakal)',
    'వెల్దుర్తి (Veldurthi)',
    'ఆదోని (Adoni)',
    'గోనెగండ్ల (Gonegandla)',
    'హోళగుంద (Holagunda)',
    'కోసిగి (Kosigi)',
    'కౌతాళం (Kowthalam)',
    'మంత్రాలయం (Mantralayam)',
    'నందవరం (Nandavaram)',
    'పెద్ద కడుబూరు (Pedda Kadubur)',
    'ఎమ్మిగనూరు (Yemmiganur)',
    'పత్తికొండ (Pattikonda)',
    'ఆలూరు (Alur)',
    'ఆస్పరి (Aspari)',
    'చిప్పగిరి (Chippagiri)',
    'దేవనకొండ (Devanakonda)',
    'హలహర్వి (Halaharvi)',
    'కృష్ణగిరి (Krishnagiri)',
    'మద్దికెర ఈస్ట్ (Maddikera East)',
    'తుగ్గలి (Tuggali)'
  ],
  'నంద్యాల (Nandyal)': [
    'నంద్యాల (Nandyal)',
    'ఆళ్లగడ్డ (Allagadda)',
    'బండి ఆత్మకూరు (Bandi Atmakur)',
    'చాగలమర్రి (Chagalamarri)',
    'దొర్నిపాడు (Dornipadu)',
    'గడివేముల (Gadivemula)',
    'గోస్పాడు (Gospadu)',
    'కోవెలకుంట్ల (Koilkuntla)',
    'మహానంది (Mahanandi)',
    'పాణ్యం (Panyam)',
    'రుద్రవరం (Rudravaram)',
    'సంజామల (Sanjamala)',
    'శిరివెళ్ల (Sirvel)',
    'ఉయ్యాలవాడ (Uyyalawada)',
    'ఆత్మకూరు (Atmakur)',
    'జూపాడు బంగళా (Jupadu Bungalow)',
    'కొత్తపల్లె (Kothapalle)',
    'మిడుతూరు (Midthur)',
    'నందికొట్కూరు (Nandikotkur)',
    'పగిడ్యాల (Pagidyala)',
    'పాములపాడు (Pamulapadu)',
    'శ్రీశైలం (Srisailam)',
    'వెలుగోడు (Velgodu)',
    'డోన్ (Dhone)',
    'బనగానపల్లె (Banaganapalle)',
    'బెతంచెర్ల (Bethamcherla)',
    'కొలిమిగుండ్ల (Kolimigundla)',
    'ఓబులాపురం / ఔక్ (Owk)',
    'పీపల్లి (Peapully)'
  ],
  'ఎన్టీఆర్ జిల్లా (NTR District)': [
    'విజయవాడ సెంట్రల్ (Vijayawada Central)',
    'విజయవాడ ఈస్ట్ (Vijayawada East)',
    'విజయవాడ నార్త్ (Vijayawada North)',
    'విజయవాడ వెస్ట్ (Vijayawada West)',
    'విజయవాడ రూరల్ (Vijayawada Rural)',
    'జి. కొండూరు (G. Konduru)',
    'ఇబ్రహీంపట్నం (Ibrahimpatnam)',
    'నందిగామ (Nandigama)',
    'చందర్లపాడు (Chandarlapadu)',
    'జగ్గయ్యపేట (Jaggaiahpeta)',
    'కంచికచర్ల (Kanchikacherla)',
    'పెనుగంచిప్రోలు (Penuganchiprolu)',
    'వత్సవాయి (Vatsavai)',
    'వీరుళ్లపాడు (Veerullapadu)',
    'తిరువూరు (Tiruvuru)',
    'ఎ. కొండూరు (A. Konduru)',
    'గంపలగూడెం (Gampalagudem)',
    'మైలవరం (Mylavaram)',
    'రెడ్డిగూడెం (Reddigudem)',
    'విస్సన్నపేట (Vissannapeta)'
  ],
  'పల్నాడు (Palnadu)': [
    'నరసరావుపేట (Narasaraopet)',
    'చిలకలూరిపేట (Chilakaluripet)',
    'ఎడ్లపాడు (Edlapadu)',
    'ఈపూరు (Ipur)',
    'నాదెండ్ల (Nadendla)',
    'నూజెండ్ల (Nuzendla)',
    'రొంపిచర్ల (Rompicherla)',
    'శావల్యాపురం (Savalyapuram)',
    'వినుకొండ (Vinukonda)',
    'సత్తెనపల్లి (Sattenapalle)',
    'అమరావతి (Amaravathi)',
    'అచ్చంపేట (Atchampet)',
    'బెల్లంకొండ (Bellamkonda)',
    'క్రోసూరు (Krosuru)',
    'ముప్పాళ్ల (Muppalla)',
    'నెకరికల్లు (Nekarikallu)',
    'పెదకూరపాడు (Pedakurapadu)',
    'రాజుపాలెం (Rajupalem)',
    'గురజాల (Gurazala)',
    'బొల్లాపల్లి (Bollapalle)',
    'దాచేపల్లి (Dachepalle)',
    'దుర్గి (Durgi)',
    'కారెంపూడి (Karempudi)',
    'మాచవరం (Machavaram)',
    'మాచర్ల (Macherla)',
    'పిడుగురాళ్ల (Piduguralla)',
    'రెంటచింతల (Rentachintala)',
    'వెల్దుర్తి (Veldurthi)'
  ],
  'పార్వతీపురం మన్యం (Parvathipuram Manyam)': [
    'పార్వతీపురం (Parvathipuram)',
    'బలిజిపేట (Balijipeta)',
    'గరుగుబిల్లి (Garugubilli)',
    'గుమ్మలక్ష్మీపురం (Gummalakshmipuram)',
    'జియ్యమ్మవలస (Jiyyammavalasa)',
    'కొమరాడ (Komarada)',
    'కురుపాం (Kurupam)',
    'మక్కువ (Makkuva)',
    'పాలకొండ (Palakonda)',
    'భామిని (Bhamini)',
    'పాచిపెంట (Pachipenta)',
    'సాలూరు (Salur)',
    'సీతంపేట (Seethampeta)',
    'సీతానగరం (Seethanagaram)',
    'వీరఘట్టం (Veeraghattam)'
  ],
  'ప్రకాశం (Prakasam)': [
    'ఒంగోలు (Ongole)',
    'చీమకుర్తి (Chimakurthy)',
    'కొండపి (Kondapi)',
    'కొత్తపట్నం (Kothapatnam)',
    'మద్దిపాడు (Maddipadu)',
    'మర్రిపూడి (Marripudi)',
    'ముండ్లమూరు (Mundlamuru)',
    'నాగులుప్పలపాడు (Naguluppalapadu)',
    'పొన్నలూరు (Ponnaluru)',
    'సంతనూతలపాడు (Santhanuthalapadu)',
    'సింగరాయకొండ (Singarayakonda)',
    'టంగుటూరు (Tangutur)',
    'తాళ్లూరు (Thallur)',
    'జరుగుమల్లి (Zarugumalli)',
    'మార్కాపురం (Markapur)',
    'అర్థవీడు (Ardhaveedu)',
    'బెస్తవారిపేట (Bestawaripeta)',
    'కంబం (Cumbum)',
    'దోర్నాల (Dornala)',
    'గిద్దలూరు (Giddalur)',
    'కొమరోలు (Komarole)',
    'కొనకనమిట్ల (Konakanamitla)',
    'పెద్దారవీడు (Pedda Araveedu)',
    'పొదిలి (Podili)',
    'పుల్లలచెరువు (Pullalacheruvu)',
    'రాచర్ల (Racherla)',
    'తర్లుపాడు (Tarlupadu)',
    'త్రిపురాంతకం (Tripuranthakam)',
    'యర్రగొండపాలెం (Yerragondapalem)',
    'కనిగిరి (Kanigiri)',
    'చంద్రశేఖరపురం (Chandra Sekhara Puram)',
    'దర్శి (Darsi)',
    'దొనకొండ (Donakonda)',
    'హనుమంతునిపాడు (Hanumanthuni Padu)',
    'కురిచేడు (Kurichedu)',
    'పామూరు (Pamur)',
    'పెదచెర్లోపల్లె (Pedacherlo Palle)',
    'వెలిగండ్ల (Veligandla)'
  ],
  'శ్రీ పొట్టి శ్రీరాములు నెల్లూరు (Sri Potti Sriramulu Nellore)': [
    'నెల్లూరు అర్బన్ (Nellore Urban)',
    'నెల్లూరు రూరల్ (Nellore Rural)',
    'అల్లూరు (Allur)',
    'బుచ్చిరెడ్డిపాలెం (Buchireddypalem)',
    'దగదర్తి (Dagadarthi)',
    'ఇందుకూరుపేట (Indukurpet)',
    'కొడవలూరు (Kodavalur)',
    'కోవూరు (Kovur)',
    'మనుబోలు (Manubolu)',
    'ముత్తుకూరు (Muthukur)',
    'పొదలకూరు (Podalakur)',
    'రాపూరు (Rapur)',
    'సైదాపురం (Saidapuram)',
    'తోటపల్లిగూడూరు (Thotapalligudur)',
    'వెంకటాచలం (Venkatachalam)',
    'విడవలూరు (Vidavalur)',
    'ఆత్మకూరు (Atmakur)',
    'అనంతసాగరం (Ananthasagaram)',
    'అనుమసముద్రంపేట (Anumasamudrampeta)',
    'చేజర్ల (Chejerla)',
    'కాలువాయి (Kaluvoya)',
    'మర్రిపాడు (Marripadu)',
    'సంగం (Sangam)',
    'సీతారాంపురము (Sitarampuramu)',
    'ఉదయగిరి (Udayagiri)',
    'కావలి (Kavali)',
    'బోగోలు (Bogole)',
    'దత్తలూరు (Duttalur)',
    'జలదంకి (Jaladanki)',
    'కలిగిరి (Kaligiri)',
    'కొండపురం (Kondapuram)',
    'వింజమూరు (Vinjamur)',
    'కందుకూరు (Kandukur)',
    'గుడ్లూరు (Gudluru)',
    'లింగసముద్రం (Lingasamudram)',
    'ఉలవపాడు (Ulavapadu)',
    'వరికుంటపాడు (Varikuntapadu)',
    'ఓలేటివారిపాలెం (Voletivaripalem)'
  ],
  'శ్రీ సత్యసాయి (Sri Sathya Sai)': [
    'పుట్టపర్తి (Puttaparthi)',
    'ఆమడగూరు (Amadagur)',
    'బుక్కపట్నం (Bukkapatnam)',
    'కొత్తచెరువు (Kothacheruvu)',
    'నల్లమాడ (Nallamada)',
    'ఓబులదేవరచెరువు (Obuladevaracheruvu)',
    'ధర్మవరం (Dharmavaram)',
    'బత్తలపల్లె (Bathalapalle)',
    'చెన్నేకొత్తపల్లె (Chennekothapalle)',
    'కనగానపల్లె (Kanaganapalle)',
    'ముదిగుబ్బ (Mudigubba)',
    'రామగిరి (Ramagiri)',
    'తాడిమర్రి (Tadimarri)',
    'పెనుకొండ (Penukonda)',
    'అగళి (Agali)',
    'అమరాపురం (Amarapuram)',
    'చిలమత్తూరు (Chilamathur)',
    'గోరంట్ల (Gorantla)',
    'గుడిబండ (Gudibanda)',
    'హిందూపురం (Hindupur)',
    'లేపాక్షి (Lepakshi)',
    'మడకశిర (Madakasira)',
    'పరిగి (Parigi)',
    'రొద్దం (Roddam)',
    'రొళ్ల (Rolla)',
    'సోమందేపల్లె (Somandepalle)',
    'కదిరి (Kadiri)',
    'గాండ్లపెంట (Gandlapenta)',
    'నల్లచెరువు (Nallacheruvu)',
    'నంబులపూలకుంట (Nambulipulikunta)',
    'తలుపుల (Talupula)',
    'తనకల్లు (Tanakal)'
  ],
  'శ్రీకాకుళం (Srikakulam)': [
    'శ్రీకాకుళం (Srikakulam)',
    'ఆమదాలవలస (Amadalavalasa)',
    'బూర్జ (Burja)',
    'ఎచ్చెర్ల (Etcherla)',
    'గanguవారిసిగడం (Ganguvarisigadam)',
    'గార (Gara)',
    'హిరమండలం (Hiramandalam)',
    'జలుమూరు (Jalumuru)',
    'ఎల్.ఎన్. పేట (L.N. Peta)',
    'లావేరు (Laveru)',
    'నరసన్నపేట (Narasannapeta)',
    'పోలాకి (Polaki)',
    'పొందూరు (Ponduru)',
    'రణస్థలం (Ranastalam)',
    'సరుబుజ్జిలి (Sarubujjili)',
    'టెక్కలి (Tekkali)',
    'కోటబొమ్మాళి (Kotabommali)',
    'కొత్తూరు (Kothuru)',
    'మెళియాపుట్టి (Meliaputti)',
    'నందిగాం (Nandigam)',
    'పాతపట్నం (Pathapatnam)',
    'సంతబొమ్మాళి (Santhabommali)',
    'సారవకోట (Saravakota)',
    'పలాస (Palasa)',
    'ఇచ్ఛాపురం (Ichchapuram)',
    'కంచిలి (Kanchili)',
    'కవిటి (Kaviti)',
    'మందస (Mandasa)',
    'సోంపేట (Sompeta)',
    'వజ్రపుకొత్తూరు (Vajrapukothuru)'
  ],
  'తిరుపతి (Tirupati)': [
    'తిరుపతి అర్బన్ (Tirupati Urban)',
    'తిరుపతి రూరల్ (Tirupati Rural)',
    'చంద్రగిరి (Chandragiri)',
    'చిన్నగొట్టిగల్లు (Chinnagottigallu)',
    'పాకాల (Pakala)',
    'పుత్తూరు (Puttur)',
    'రామచంద్రాపురం (Ramachandrapuram)',
    'రేణిగుంట (Renigunta)',
    'వడమాలపేట (Vadamalapeta)',
    'ఎర్రవారిపాలెం (Yerravaripalem)',
    'నారాయణవనం (Narayanavanam)',
    'పిచ్చాటూరు (Pichatur)',
    'గూడూరు (Gudur)',
    'బాలాయపల్లె (Balayapalle)',
    'చిల్లకూరు (Chillakur)',
    'చిట్టమూరు (Chittamur)',
    'డక్కిలి (Dakili)',
    'కోట (Kota)',
    'వాకాడు (Vakadu)',
    'వెంకటగిరి (Venkatagiri)',
    'సూళ్లూరుపేట (Sullurpeta)',
    'బుచ్చినాయుడు ఖండ్రిగ (Buchinaidu Kandriga)',
    'దొరవారిసత్రం (Doravarisatram)',
    'కె.వి.బి. పురం (K.V.B. Puram)',
    'నగలాపురం (Nagalapuram)',
    'నాయుడుపేట (Naidupeta)',
    'ఓజిలి (Ozili)',
    'పెళ్లకూరు (Pellakur)',
    'సత్యవేడు (Satyavedu)',
    'శ్రీకాళహస్తి (Srikalahasti)',
    'తడ (Tada)',
    'తొట్టంబేడు (Thottambedu)',
    'వరదయ్యపాలెం (Varadaiahpalem)',
    'ఏర్పేడు (Yerpedu)'
  ],
  'విశాఖపట్నం (Visakhapatnam)': [
    'విశాఖపట్నం రూరల్ (Visakhapatnam Rural)',
    'గాజువాక (Gajuwaka)',
    'గోపాలపట్నం (Gopalapatnam)',
    'మహారాణిపేట (Maharanipeta)',
    'ములగాడ (Mulagada)',
    'సీతమ్మధార (Seethammadhara)',
    'భీమునిపట్నం (Bheemunipatnam)',
    'ఆనందపురం (Anandapuram)',
    'పద్మనాభం (Padmanabham)',
    'పెదగంట్యాడ (Pedagantyada)',
    'పెందుర్తి (Pendurthi)'
  ],
  'విజయనగరం (Vizianagaram)': [
    'విజయనగరం (Vizianagaram)',
    'భోగాపురం (Bhogapuram)',
    'బొండపల్లి (Bondapalli)',
    'డెంకాడ (Denkada)',
    'గంట్యాడ (Gantyada)',
    'జామి (Jami)',
    'కొత్తవలస (Kothavalasa)',
    'లక్కవరపుకోట (Lakkavarapukota)',
    'నెల్లిమర్ల (Nellimarla)',
    'పూసపాటిరేగ (Pusapatirega)',
    'శృంగవరపుకోట (Srungavarapukota)',
    'వేపాడ (Vepada)',
    'బొబ్బిలి (Bobbili)',
    'బాడంగి (Badangi)',
    'దత్తిరాజేరు (Dattirajeru)',
    'గజపతినగరం (Gajapathinagaram)',
    'మెంటాడ (Mentada)',
    'రామభద్రపురం (Ramabhadrapuram)',
    'తెర్లాం (Therlam)',
    'చీపురుపల్లి (Cheepurupalli)',
    'గరివిడి (Garividi)',
    'గుర్ల (Gurla)',
    'మెరకముడిదం (Merakamudidam)',
    'రాజాం (Rajam)',
    'రేగిడి ఆమదాలవలస (Regidi Amadalavalasa)',
    'సంతకవిటి (Santhakaviti)',
    'వంగర (Vangara)'
  ],
  'పశ్చిమ గోదావరి (West Godavari)': [
    'భీమవరం (Bhimavaram)',
    'ఆకివీడు (Akividu)',
    'కాళ్ల (Kalla)',
    'పాలకోడేరు (Palacoderu)',
    'ఉండి (Undi)',
    'వీరవాసరం (Veeravasaram)',
    'నరసాపురం (Narasapuram)',
    'ఆచంట (Achanta)',
    'మొగల్తూరు (Mogalthur)',
    'పాలకొల్లు (Palakollu)',
    'పోడూరు (Poduru)',
    'యలమంచిలి (Yelamanchili)',
    'తాడేపల్లిగూడెం (Tadepalligudem)',
    'అత్తిలి (Attili)',
    'గణపవరం (Ganapavaram)',
    'ఇరగవరం (Iragavaram)',
    'పెంటపాడు (Pentapadu)',
    'పెనుగొండ (Penugonda)',
    'పెనుమంట్ర (Penumantra)',
    'తణుకు (Tanuku)'
  ],
  'వైఎస్సార్ కడప (YSR Kadapa)': [
    'కడప (Kadapa)',
    'చక్రాయపేట (Chakrayapet)',
    'చెన్నూరు (Chennur)',
    'చింతకొమ్మదిన్నె (Chinthakommadinne)',
    'కమలాపురం (Kamalapuram)',
    'పెండ్లిమర్రి (Pendlimarri)',
    'సిద్దవటం (Sidhout)',
    'వల్లూరు (Vallur)',
    'వీరపునాయునిపల్లె (Veerapunayunipalle)',
    'ఒంటిమిట్ట (Vontimitta)',
    'ఎర్రగుంట్ల (Yerraguntla)',
    'బద్వేలు (Badvel)',
    'అట్లూరు (Atlur)',
    'బి. కోడూరు (B. Kodur)',
    'బ్రహ్మంగారిమఠం (Brahmamgarimattam)',
    'చాపాడు (Chapad)',
    'దువ్వూరు (Duvvur)',
    'గోపవరం (Gopavaram)',
    'కలసపాడు (Kalasapadu)',
    'ఖాజీపేట (Khajipet)',
    'ఎస్. మైదుకూరు (S. Mydukur)',
    'పోరుమామిళ్ల (Porumamilla)',
    'శ్రీ అవధూత కాశినాయన (Sri Avadhutha Kasinayana)',
    'జమ్మలమడుగు (Jammalamadugu)',
    'కొండాపురం (Kondapuram)',
    'ముద్దనూరు (Muddanur)',
    'మైలవరం (Mylavaram)',
    'పెద్దముడియం (Peddamudium)',
    'ప్రొద్దుటూరు (Proddatur)',
    'రాజుపాలెం (Rajupalem)',
    'పులివెందుల (Pulivendula)',
    'లింగాల (Lingala)',
    'సింహాద్రిపురం (Simhadripuram)',
    'తొండూరు (Thondur)',
    'వేంపల్లి (Vempalli)',
    'వేముల (Vemula)'
  ]
};

// Complete Administrative Reference Directory for Telangana (33 Districts) from official directory
export const TELANGANA_33_DISTRICTS: Record<string, string[]> = {
  'ఆదిలాబాద్ (Adilabad)': [
    'ఆదిలాబాద్ అర్బన్ (Adilabad Urban)',
    'ఆదిలాబాద్ రూరల్ (Adilabad Rural)',
    'మావల (Mavala)',
    'గుడిహత్నూర్ (Gudihathnoor)',
    'బేల (Bela)',
    'భీంపూర్ (Bheempoor)',
    'జైనథ్ (Jainad)',
    'తాంసి (Tamsi)',
    'తలమడుగు (Talamadagu)',
    'నేరడిగొండ (Neradigonda)',
    'ఇచ్చోడ (Ichoda)',
    'బజార్‌హత్నూర్ (Bazarhatnoor)',
    'బోథ్ (Boath)',
    'సిరికొండ (Sirikonda)',
    'ఇంద్రవెల్లి (Inderavelly)',
    'నార్నూర్ (Narnoor)',
    'గాదిగూడ (Gadiguda)',
    'ఉట్నూర్ (Utnoor)'
  ],
  'భద్రాద్రి కొత్తగూడెం (Bhadradri Kothagudem)': [
    'కొత్తగూడెం (Kothagudem)',
    'పాల్వంచ (Palvancha)',
    'టేకులపల్లి (Tekulapalle)',
    'యెల్లందు (Yellandu)',
    'చంద్రుగొండ (Chandrugonda)',
    'అశ్వారావుపేట (Aswaraopeta)',
    'ములకలపల్లి (Mulakalapalle)',
    'దమ్మపేట (Dammapeta)',
    'గుండాల (Gundala)',
    'జూలూరుపాడు (Julurpad)',
    'సుజాతనగర్ (Sujathanagar)',
    'చుంచుపల్లి (Chunchupally)',
    'లక్ష్మీదేవిపల్లి (Laxmidevipalli)',
    'ఆళ్లపల్లి (Allapalli)',
    'అన్నపురెడ్డిపల్లి (Annapureddypally)',
    'భద్రాచలం (Bhadrachalam)',
    'దుమ్ముగూడెం (Dummugudem)',
    'చర్ల (Cherla)',
    'బూర్గంపాడు (Burgampahad)',
    'అశ్వాపురం (Aswapuram)',
    'మణుగూరు (Manuguru)',
    'పినపాక (Pinapaka)',
    'కారకగూడెం (Karakagudem)'
  ],
  'హనుమకొండ (Hanumakonda)': [
    'హనుమకొండ (Hanumakonda)',
    'కాజీపేట (Kazipet)',
    'హసన్‌పర్తి (Hasanparthy)',
    'ఐనవోలు (Inavole)',
    'కమలాపూర్ (Kamalapur)',
    'వేలేర్ (Velair)',
    'భీమదేవరపల్లి (Bheemadevarapalle)',
    'ఎల్కతుర్తి (Elkathurthy)',
    'ధర్మసాగర్ (Dharmasagar)',
    'పరకాల (Parkal)',
    'ఆత్మకూరు (Atmakur)',
    'దామెర (Damera)',
    'శాయంపేట (Shayampet)',
    'నడికూడ (Nadikuda)'
  ],
  'హైదరాబాద్ (Hyderabad)': [
    'అంబర్‌పేట (Amberpet)',
    'ఆసిఫ్‌నగర్ (Asifnagar)',
    'బహదూర్‌పురా (Bahadurpura)',
    'బండ్లగూడ (Bandlaguda)',
    'చార్మినార్ (Charminar)',
    'గోల్కొండ (Golkonda)',
    'హిమాయత్‌నగర్ (Himayathnagar)',
    'నాంపల్లి (Nampally)',
    'సైదాబాద్ (Saidabad)',
    'అమీర్‌పేట (Ameerpet)',
    'ఖైరతాబాద్ (Khairatabad)',
    'మారేడ్‌పల్లి (Marredpally)',
    'ముషీరాబాద్ (Musheerabad)',
    'సికింద్రాబాద్ (Secunderabad)',
    'షేక్‌పేట (Shaikpet)',
    'తిరుమలగిరి (Tirumalagiri)'
  ],
  'జగిత్యాల (Jagtial)': [
    'జగిత్యాల (Jagtial)',
    'జగిత్యాల రూరల్ (Jagtial Rural)',
    'రాయికల్ (Raikal)',
    'సారంగాపూర్ (Sarangapur)',
    'బీర్పూర్ (Beerpur)',
    'ధర్మపురి (Dharmapuri)',
    'బుగ్గారం (Buggaram)',
    'పెగడపల్లి (Pegadapalle)',
    'గొల్లపల్లి (Gollapalle)',
    'మల్యాల (Mallial)',
    'కొడిమ్యాల (Kodimial)',
    'వెల్గటూరు (Velgatoor)',
    'కోరుట్ల (Korutla)',
    'మెట్‌పల్లి (Metpalli)',
    'మల్లాపూర్ (Mallapur)',
    'ఇబ్రహీంపట్నం (Ibrahimpatnam)',
    'మేడిపల్లి (Medipalle)',
    'కథలాపూర్ (Kathlapur)',
    'భీమారం (Bheemaram)',
    'ఎండపల్లి (Endapalli)'
  ],
  'జనగామ (Jangaon)': [
    'జనగామ (Jangaon)',
    'లింగాల ఘనపూర్ (Lingalaghanpur)',
    'బచ్చన్నపేట (Bachannapeta)',
    'దేవరుప్పుల (Devaruppula)',
    'నర్మెట్ట (Narmetta)',
    'తరిగొప్పుల (Tharigoppula)',
    'రఘునాథపల్లి (Raghunathapalle)',
    'స్టేషన్ ఘన్‌పూర్ (Station Ghanpur)',
    'చిల్పూరు (Chilpur)',
    'జాఫర్‌గఢ్ (Zaffergadh)',
    'పాలకుర్తి (Palakurthi)',
    'కొడకండ్ల (Kodakandla)'
  ],
  'జయశంకర్ భూపాలపల్లి (Jayashankar Bhupalpally)': [
    'భూపాలపల్లి (Bhupalpally)',
    'ఘన్‌పూర్ ములుగు (Ghanpur Mulug)',
    'రేగొండ (Regonda)',
    'మొగుళ్లపల్లి (Mogullapalle)',
    'చిట్యాల (Chityal)',
    'టేకుమట్ల (Tekumatla)',
    'మల్హర్‌రావు (Malharrao)',
    'కాటారం (Kataram)',
    'మహాదేవపూర్ (Mahadevpur)',
    'పలిమెల (Palimela)',
    'మహా ముత్తారం (Maha Mutharam)',
    'కొత్తపల్లి గోరి (Kothapally Gori)'
  ],
  'జోగులాంబ గద్వాల (Jogulamba Gadwal)': [
    'గద్వాల (Gadwal)',
    'ధరూర్ (Dharur)',
    'మల్దకల్ (Maldakal)',
    'ఘట్టు (Ghattu)',
    'కాలూర్ తిమ్మానదొడ్డి (Kaloor Timmanadoddi)',
    'ఇటిక్యాల (Itikyal)',
    'మానోపాడు (Manopad)',
    'వడ్డేపల్లి (Waddepalle)',
    'రాజోలి (Rajoli)',
    'ఉండవెల్లి (Undavelli)',
    'అలంపూర్ (Alampur)',
    'అయిజ (Aiza)',
    'ఎర్రవల్లి (Yerravalli)'
  ],
  'కామారెడ్డి (Kamareddy)': [
    'కామారెడ్డి (Kamareddy)',
    'భిక్నూర్ (Bhiknoor)',
    'తాడ్వాయి (Tadwai)',
    'రాజంపేట (Rajampet)',
    'దోమకొండ (Domakonda)',
    'మాచారెడ్డి (Machareddy)',
    'రామారెడ్డి (Ramareddy)',
    'సదాశివనగర్ (Sadasivanagar)',
    'బీబీపేట్ (Bibipet)',
    'పాల్వంచ (Palvancha)',
    'బాన్సువాడ (Banswada)',
    'బిచ్కుంద (Bichkunda)',
    'జుక్కల్ (Jukkal)',
    'మద్నూర్ (Madnoor)',
    'పిట్లం (Pitlam)',
    'పెద్ద కొడప్‌గల్ (Pedda Kodapgal)',
    'బీర్కూర్ (Birkoor)',
    'నస్రుల్లాబాద్ (Nasurullabad)',
    'నిజాంసాగర్ (Nizamsagar)',
    'డోంగ్లి (Dongli)',
    'మొహమ్మద్ నగర్ (Mohammadnagar)',
    'ఎల్లారెడ్డి (Yellareddy)',
    'నాగిరెడ్డిపేట్ (Nagireddypet)',
    'లింగంపేట్ (Lingampet)',
    'గాంధారి (Gandhari)'
  ],
  'కరీంనగర్ (Karimnagar)': [
    'కరీంనగర్ (Karimnagar)',
    'కరీంనగర్ రూరల్-1 కొత్తపల్లి (Karimnagar Rural-I)',
    'కరీంనగర్ రూరల్-2 చింతకుంట (Karimnagar Rural-II)',
    'మానకొండూరు (Manakondur)',
    'తిమ్మాపూర్ (Thimmapur)',
    'గన్నేరువరం (Ganneruvaram)',
    'గంగాధర (Gangadhara)',
    'రామడుగు (Ramadugu)',
    'చొప్పదండి (Choppadandi)',
    'చిగురుమామిడి (Chigurumamidi)',
    'హుజూరాబాద్ (Huzurabad)',
    'వీణవంక (Veenavanka)',
    'వి. సైదాపూర్ (V. Saidapur)',
    'జమ్మికుంట (Jammikunta)',
    'ఇల్లందకుంట (Ellandakunta)',
    'శంకరపట్నం (Shankarapatnam)'
  ],
  'ఖమ్మం (Khammam)': [
    'ఖమ్మం అర్బన్ (Khammam Urban)',
    'ఖమ్మం రూరల్ (Khammam Rural)',
    'రఘునాథపాలెం (Raghunadhapalem)',
    'తిరుమలాయపాలెం (Thirumalayapalem)',
    'కూసుమంచి (Kusumanchi)',
    'నేలకొండపల్లి (Nelakondapalle)',
    'ముదిగొండ (Mudigonda)',
    'చింతకాని (Chinthakani)',
    'కొనిజర్ల (Konijerla)',
    'సింగరేణి (Singareni)',
    'కామేపల్లి (Kamepalle)',
    'వైరా (Wyra)',
    'బోనకల్ (Bonakal)',
    'మధిర (Madhira)',
    'ఎర్రుపాలెం (Yerrupalem)',
    'సత్తుపల్లి (Sathupalli)',
    'వేంసూరు (Vemsoor)',
    'పెనుబల్లి (Penuballi)',
    'కల్లూరు (Kalluru)',
    'తల్లాడ (Thallada)',
    'ఏన్కూరు (Enkuru)'
  ],
  'కుమ్రం భీమ్ ఆసిఫాబాద్ (Kumuram Bheem Asifabad)': [
    'ఆసిఫాబాద్ (Asifabad)',
    'కెరమెరి (Kerameri)',
    'వాంకిడి (Wankidi)',
    'జైనూర్ (Jainoor)',
    'సిర్పూర్ యు (Sirpur U)',
    'లింగాపూర్ (Lingapur)',
    'తిర్యాణి (Tiryani)',
    'రెబ్బెన (Rebbena)',
    'కాగజ్‌నగర్ (Kagaznagar)',
    'సిర్పూర్ టి (Sirpur T)',
    'కౌతల (Kouthala)',
    'చింతలమానెపల్లి (Chintalamanepally)',
    'బెజ్జూరు (Bejjur)',
    'పెంచికల్‌పేట్ (Penchikalpet)',
    'దహేగాం (Dahegaon)'
  ],
  'మహబూబాబాద్ (Mahabubabad)': [
    'మహబూబాబాద్ (Mahabubabad)',
    'కురవి (Kuravi)',
    'కేసముద్రం (Kesamudram)',
    'డోర్నకల్ (Dornakal)',
    'గూడూరు (Gudur)',
    'కొత్తగూడ (Kothaguda)',
    'గంగారం (Gangaram)',
    'బయ్యారం (Bayyaram)',
    'గార్ల (Garla)',
    'సీరోలు (Seerole)',
    'ఇనుగుర్తి (Inugurthy)',
    'తొర్రూరు (Thorrur)',
    'పెద్దవంగర (Peddavangara)',
    'నెల్లికుదురు (Nellikudur)',
    'మరిపెడ (Maripeda)',
    'దంతాలపల్లి (Danthalapalle)',
    'నర్సింహులపేట (Narsimhulapet)',
    'చిన్నగూడూరు (Chinnagudur)'
  ],
  'మహబూబ్‌నగర్ (Mahabubnagar)': [
    'మహబూబ్‌నగర్ అర్బన్ (Mahabubnagar Urban)',
    'మహబూబ్‌నగర్ రూరల్ (Mahabubnagar Rural)',
    'భూత్పూర్ (Bhoothpur)',
    'హన్వాడ (Hanwada)',
    'కోయిల్కొండ (Koilkonda)',
    'నవాబ్‌పేట (Nawabpet)',
    'జడ్చర్ల (Jadcherla)',
    'బాలానగర్ (Balanagar)',
    'రాజాపూర్ (Rajapur)',
    'మిడ్జిల్ (Midjil)',
    'దేవరకద్ర (Devarkadra)',
    'చిన్న చింతకుంట (Chinna Chintakunta)',
    'అడ్డకల్ (Addakal)',
    'మూసాపేట్ (Musapet)',
    'మహమ్మదాబాద్ (Mohammadabad)',
    'గండీడ్ (Gandeed)',
    'కౌకుంట్ల (Koulaspur Kaukuntla)'
  ],
  'మంచిర్యాల (Mancherial)': [
    'మంచిర్యాల (Mancherial)',
    'నస్పూర్ (Naspur)',
    'హాజీపూర్ (Hajipur)',
    'లక్సెట్టిపేట (Luxettipet)',
    'దండేపల్లి (Dandepally)',
    'జన్నారం (Jannaram)',
    'మందమర్రి (Mandamarri)',
    'జైపూర్ (Jaipur)',
    'భీమారం (Bheemaram)',
    'చెన్నూర్ (Chennur)',
    'కోటపల్లి (Kotapally)',
    'బెల్లంపల్లి (Bellampally)',
    'కాశీపేట్ (Kasipet)',
    'తాండూరు (Tandur)',
    'వేమనపల్లి (Vemanpalle)',
    'నెన్నెల (Nennel)',
    'భీమిని (Bheemini)',
    'కన్నెపల్లి (Kannepally)'
  ],
  'మెదక్ (Medak)': [
    'మెదక్ (Medak)',
    'హవేలి ఘన్‌పూర్ (Havelighanpur)',
    'పాపన్నపేట (Papannapet)',
    'శంకరంపేట రూరల్ (Shankarampet R)',
    'రామాయంపేట (Ramayampet)',
    'నిజాంపేట (Nizampet)',
    'శంకరంపేట ఎ (Shankarampet A)',
    'టేక్మాల్ (Tekmal)',
    'అల్లాదుర్గం (Alladurg)',
    'రేగోడు (Regode)',
    'నర్సాపూర్ (Narsapur)',
    'కుల్చారం (Kulcharam)',
    'కౌడిపల్లి (Kowdipalle)',
    'శివంపేట (Shivampet)',
    'చిలిపిచేడ్ (Chilipched)',
    'తూప్రాన్ (Toopran)',
    'చేగుంట (Chegunta)',
    'ఎల్దుర్తి (Yeldurthy)',
    'మనోహరాబాద్ (Manoharabad)',
    'నర్సింగి (Narsingi)',
    'మాసైపేట్ (Masaipet)'
  ],
  'మేడ్చల్-మల్కాజ్‌గిరి (Medchal-Malkajgiri)': [
    'మల్కాజ్‌గిరి (Malkajgiri)',
    'అల్వాల్ (Alwal)',
    'కుత్బుల్లాపూర్ (Quthbullapur)',
    'దుండిగల్ గండిమైసమ్మ (Dundigal Gandimaisamma)',
    'బాచుపల్లి (Bachupally)',
    'కూకట్‌పల్లి (Kukatpally)',
    'బాలానగర్ (Balanagar)',
    'మేడ్చల్ (Medchal)',
    'శామీర్‌పేట్ (Shamirpet)',
    'కీసర (Keesara)',
    'కాప్రా (Kapra)',
    'ఘట్‌కేసర్ (Ghatkesar)',
    'మేడిపల్లి (Medipally)',
    'ఉప్పల్ (Uppal)',
    'మూడుచింతలపల్లి (Muduchintalpalli)'
  ],
  'ములుగు (Mulugu)': [
    'ములుగు (Mulugu)',
    'వెంకటాపూర్ (Venkatapur)',
    'గోవిందరావుపేట (Govindaraopet)',
    'సమ్మక్క సారలమ్మ తాడ్వాయి (Sammakka Saralamma Tadvai)',
    'ఏటూరునాగారం (Eturnagaram)',
    'మంగపేట (Mangapet)',
    'కన్నాయిగూడెం (Kannaigudem)',
    'వెంకటాపురం నూగూరు (Venkatapuram Nuguru)',
    'వాజేడు (Wazeed)',
    'మల్లంపల్లి (Mallampalli)'
  ],
  'నాగర్‌కర్నూల్ (Nagarkurnool)': [
    'నాగర్‌కర్నూల్ (Nagarkurnool)',
    'బిజినేపల్లి (Bijinapalle)',
    'తాడూరు (Tadoor)',
    'తెల్కపల్లి (Telkapalle)',
    'తిమ్మాజిపేట (Thimmajipeta)',
    'అచ్చంపేట (Achampet)',
    'అమ్రాబాద్ (Amrabad)',
    'పదర (Padra)',
    'బల్మూర్ (Balmoor)',
    'లింగాల (Lingal)',
    'ఉప్పునుంతల (Uppunuthala)',
    'కల్వకుర్తి (Kalwakurthy)',
    'ఊర్కొండ (Urkonda)',
    'వెల్దండ (Veldanda)',
    'వంగూరు (Vangoor)',
    'చారకొండ (Charakonda)',
    'కొల్లాపూర్ (Kollapur)',
    'పెంట్లవెల్లి (Pentlavelli)',
    'పెద్దకొత్తపల్లి (Peddakothapalle)',
    'కోడైర్ (Kodair)'
  ],
  'నల్గొండ (Nalgonda)': [
    'నల్గొండ (Nalgonda)',
    'తిప్పర్తి (Thipparthi)',
    'కనగల్ (Kanagal)',
    'చండూరు (Chandur)',
    'మునుగోడు (Munugode)',
    'నకిరేకల్ (Nakrekal)',
    'కేతేపల్లి (Kethepalle)',
    'శాలిగౌరారం (Shaligouraram)',
    'కట్టంగూరు (Kattangoor)',
    'చిట్యాల (Chityala)',
    'నార్కట్‌పల్లి (Narketpalle)',
    'గట్టుప్పల్ (Gattuppal)',
    'మిర్యాలగూడ (Miryalaguda)',
    'వేములపల్లి (Vemulapalle)',
    'మాడ్గులపల్లి (Madugulapally)',
    'అడవిదేవులపల్లి (Adavidevulapalli)',
    'దామరచర్ల (Damaracherla)',
    'అనుముల హాలియా (Anumula)',
    'నిడమానూరు (Nidamanur)',
    'పెద్దవూర (Peddavoora)',
    'త్రిపురారం (Thripuraram)',
    'తిరుమలగిరి సాగర్ (Tirumalagiri Sagar)',
    'గుడిపల్లి (Gudipally)',
    'దేవరకొండ (Devarakonda)',
    'కొండమల్లేపల్లి (Kondamallepally)',
    'పెద్దఅడిశర్లపల్లి (Pedda Adiserlapally)',
    'గుండ్లపల్లి డిండి (Gundlapally)',
    'చందంపేట (Chandampet)',
    'నేరెడుగొమ్ము (Neredugommu)',
    'చింతపల్లి (Chinthapally)',
    'మర్రిగూడ (Marriguda)',
    'నాంపల్లి (Nampally)',
    'గుర్రంపోడ్ (Gurrampode)'
  ],
  'నారాయణపేట (Narayanpet)': [
    'నారాయణపేట (Narayanpet)',
    'దామరగిద్ద (Damaragidda)',
    'ధన్వాడ (Dhanwada)',
    'మరికల్ (Marikal)',
    'మద్దూరు (Maddur)',
    'కోస్గి (Kosgi)',
    'గుండుమాల్ (Gundumal)',
    'కొత్తపల్లి (Kothapally)',
    'మక్తల్ (Makthal)',
    'నర్వ (Narva)',
    'ఊట్కూరు (Utkoor)',
    'మాగనూరు (Maganoor)',
    'కృష్ణ (Krishna)'
  ],
  'నిర్మల్ (Nirmal)': [
    'నిర్మల్ అర్బన్ (Nirmal Urban)',
    'నిర్మల్ రూరల్ (Nirmal Rural)',
    'సోన్ (Soan)',
    'దిలావర్‌పూర్ (Dilawarpur)',
    'నర్సాపూర్ జి (Narsapur G)',
    'కడెం పెద్దూరు (Kaddam)',
    'దస్తూరాబాద్ (Dasturabad)',
    'ఖానాపూర్ (Khanapur)',
    'పెంభి (Pembi)',
    'మామడ (Mamda)',
    'లక్ష్మణచాంద (Laxmanchanda)',
    'సారంగాపూర్ (Sarangapur)',
    'భైంసా (Bhainsa)',
    'ముధోల్ (Mudhole)',
    'బాసర (Basar)',
    'లోకేశ్వరం (Lokeshwaram)',
    'తానూర్ (Tanoor)',
    'కుబీర్ (Kubeer)',
    'కుంటాల (Kuntala)'
  ],
  'నిజామాబాద్ (Nizamabad)': [
    'నిజామాబాద్ నార్త్ (Nizamabad North)',
    'నిజామాబాద్ సౌత్ (Nizamabad South)',
    'నిజామాబాద్ రూరల్ (Nizamabad Rural)',
    'ముగ్పాల్ (Mugpal)',
    'డిచ్‌పల్లి (Dichpalle)',
    'ఇందల్వాయి (Indalwai)',
    'ధర్పల్లి (Dharpalle)',
    'సిరికొండ (Sirikonda)',
    'మాక్లూర్ (Makloor)',
    'నవిపేట్ (Navipet)',
    'ఆర్మూర్ (Armoor)',
    'బాల్కొండ (Balkonda)',
    'మెండోరా (Mendora)',
    'ముప్కాల్ (Mupkal)',
    'యేర్గట్ల (Yerugatla)',
    'కమ్మర్‌పల్లి (Kammarpalle)',
    'మోర్తాడ్ (Mortad)',
    'భీమ్‌గల్ (Bheemgal)',
    'వేల్పూర్ (Velpur)',
    'జక్రాన్‌పల్లి (Jakranpalle)',
    'నందిపేట్ (Nandipet)',
    'ఆలూర్ (Aloor)',
    'డొంకేశ్వర్ (Donkeshwar)',
    'బోధన్ (Bodhan)',
    'రంజల్ (Ranjal)',
    'ఎడపల్లి (Yedapalle)',
    'రుద్రూర్ (Rudrur)',
    'కోటగిరి (Kotgiri)',
    'వర్ని (Varni)',
    'మోస్రా (Mosra)',
    'చందూర్ (Chandur)',
    'పోతంగల్ (Pothangal)',
    'సాలూర (Saloora)'
  ],
  'పెద్దపల్లి (Peddapalli)': [
    'పెద్దపల్లి (Peddapalli)',
    'ఓదెల (Odela)',
    'సుల్తానాబాద్ (Sultanabad)',
    'జూలపల్లి (Julapalle)',
    'ఎలిగేడు (Elgaid)',
    'ధర్మారం (Dharmaram)',
    'రామగుండం (Ramagundam)',
    'అంతర్గాం (Antargaon)',
    'పాలకుర్తి (Palakurthy)',
    'శ్రీరాంపూర్ (Srirampur)',
    'మంథని (Manthani)',
    'కమాన్‌పూర్ (Kamanpur)',
    'రామగిరి (Ramagiri)',
    'ముత్తారం (Mutharam)'
  ],
  'రాజన్న సిరిసిల్ల (Rajanna Sircilla)': [
    'సిరిసిల్ల (Sircilla)',
    'తంగళ్లపల్లి (Thangallapalle)',
    'గంభీరావుపేట్ (Gambhiraopet)',
    'ఎల్లారెడ్డిపేట్ (Yellareddypet)',
    'వీర్నపల్లి (Veernapalle)',
    'ముస్తాబాద్ (Mustabad)',
    'ఇల్లంతకుంట (Ellanthakunta)',
    'వేములవాడ (Vemulawada)',
    'వేములవాడ రూరల్ (Vemulawada Rural)',
    'చందుర్తి (Chandurthi)',
    'రుద్రంగి (Rudrangi)',
    'బోయినపల్లి (Boinpalle)',
    'కోనరావుపేట్ (Konaraopet)'
  ],
  'రంగారెడ్డి (Rangareddy)': [
    'రాజేంద్రనగర్ (Rajendranagar)',
    'గండిపేట్ (Gandipet)',
    'శేరిలింగంపల్లి (Serilingampally)',
    'శంషాబాద్ (Shamshabad)',
    'చేవెళ్ల (Chevella)',
    'షాబాద్ (Shahbad)',
    'మొయినాబాద్ (Moinabad)',
    'శంకర్‌పల్లి (Shankarpally)',
    'ఇబ్రహీంపట్నం (Ibrahimpatnam)',
    'మంచాల (Manchal)',
    'యాచారం (Yacharam)',
    'అబ్దుల్లాపూర్‌మెట్ (Abdullapurmet)',
    'హయత్‌నగర్ (Hayathnagar)',
    'మాడ్గుల (Madgul)',
    'కందుకూరు (Kandukur)',
    'మహేశ్వరం (Maheshwaram)',
    'బాలాపూర్ (Balapur)',
    'సరూర్‌నగర్ (Saroornagar)',
    'ఆమన్‌గల్ (Amangal)',
    'కడ్తాల్ (Kadthal)',
    'తలకొండపల్లి (Talakondapalle)',
    'షాద్‌నగర్ ఫరూఖ్‌నగర్ (Farooqnagar)',
    'కొత్తూరు (Kothur)',
    'కేశంపేట (Keshampet)',
    'కొందుర్గ్ (Kondurg)',
    'చౌదరి గూడెం (Chowdergudem)',
    'నందిగామ (Nandigama)'
  ],
  'సంగారెడ్డి (Sangareddy)': [
    'సంగారెడ్డి (Sangareddy)',
    'కంది (Kandi)',
    'కొండాపూర్ (Kondapur)',
    'సదాశివపేట (Sadasivpet)',
    'పటాన్‌చెరు (Patancheru)',
    'అమీన్‌పూర్ (Ameenpur)',
    'రామచంద్రాపురం (Ramachandrapuram)',
    'జిన్నారం (Jinnaram)',
    'గుమ్మడిదల (Gummadidala)',
    'హత్నూర (Hathnoora)',
    'మునిపల్లి (Munipally)',
    'ఆందోల్ జోగిపేట (Andole)',
    'పుల్కల్ (Pulkal)',
    'చౌటకూరు (Chowtakur)',
    'వట్‌పల్లి (Vatpally)',
    'నిజాంపేట్ (Nizampet)',
    'జహీరాబాద్ (Zaheerabad)',
    'మొగుడంపల్లి (Mogudampally)',
    'న్యాల్‌కల్ (Nyalkal)',
    'ఝరాసంగం (Jharasangam)',
    'కోహీర్ (Kohir)',
    'రాయికోడ్ (Raikode)',
    'నారాయణఖేడ్ (Narayankhed)',
    'కంగ్టి (Kangti)',
    'కల్హేర్ (Kalher)',
    'సిర్గాపూర్ (Sirgapoor)',
    'మానూరు (Manoor)',
    'నాగిల్‌గిద్ద (Nagilgidda)'
  ],
  'సిద్ధిపేట (Siddipet)': [
    'సిద్ధిపేట అర్బన్ (Siddipet Urban)',
    'సిద్ధిపేట రూరల్ (Siddipet Rural)',
    'నంగనూరు (Nangnoor)',
    'చిన్నకోడూరు (Chinnakodur)',
    'తొగుట (Thoguta)',
    'దుబ్బాక (Dubbak)',
    'మిరుదొడ్డి (Mirdoddi)',
    'దౌల్తాబాద్ (Doulthabad)',
    'కొమురవెల్లి (Komuravelli)',
    'చేర్యాల (Cherial)',
    'నారాయణరావుపేట (Narayanaraopet)',
    'అక్బర్‌పేట భూంపల్లి (Akbarpet-Bhoompally)',
    'గజ్వేల్ (Gajwel)',
    'జగదేవ్‌పూర్ (Jagdevpur)',
    'కొండపాక (Kondapak)',
    'ములుగు (Mulugu)',
    'మర్కూక్ (Markook)',
    'వర్గల్ (Wargal)',
    'రాయపోల్ (Raipole)',
    'కుకునూరుపల్లి (Kukunoorpally)',
    'హుస్నాబాద్ (Husnabad)',
    'అక్కన్నపేట (Akkannapet)',
    'కోహెడ (Koheda)',
    'బెజ్జంకి (Bejjanki)',
    'మద్దూరు (Maddur)',
    'ధూల్మిట్ట (Dhoolmitta)'
  ],
  'సూర్యాపేట (Suryapet)': [
    'సూర్యాపేట (Suryapet)',
    'ఆత్మకూరు ఎస్ (Atmakur S)',
    'చివ్వెంల (Chivvemla)',
    'పెన్‌పహాడ్ (Penpahad)',
    'మోతే (Mothey)',
    'తుంగతుర్తి (Thungathurthy)',
    'నూతనకల్ (Nutankal)',
    'మద్దిరాల (Maddirala)',
    'తిరుమలగిరి (Thirumalagiri)',
    'జాజిరెడ్డిగూడెం (Jajireddygudem)',
    'నాగారం (Nagaram)',
    'కోదాడ (Kodad)',
    'చిలుకూరు (Chilkur)',
    'మునగాల (Munagala)',
    'నడిగూడెం (Nadigudem)',
    'అనంతగిరి (Ananthagiri)',
    'హుజూర్‌నగర్ (Huzurnagar)',
    'నేరేడుచర్ల (Neredcherla)',
    'గరిడేపల్లి (Garidepally)',
    'పాలకీడు (Palakeedu)',
    'మేళ్లచెరువు (Mellachervu)',
    'చింతలపాలెం మల్లారెడ్డిగూడెం (Chinthalapalem)',
    'మట్టంపల్లి (Mattampally)'
  ],
  'వికారాబాద్ (Vikarabad)': [
    'వికారాబాద్ (Vikarabad)',
    'మోమిన్‌పేట్ (Mominpet)',
    'మర్పల్లి (Marpalle)',
    'చిట్టగిద్ద (Chittagidda)',
    'ధారూర్ (Dharur)',
    'బంట్వారం (Bantwaram)',
    'కోటపల్లి (Kotepally)',
    'నవాబ్‌పేట్ (Nawabpet)',
    'పుదూర్ (Pudur)',
    'పరిగి (Pargi)',
    'కులకచర్ల (Kulkacherla)',
    'దోమ (Doma)',
    'తాండూరు (Tandur)',
    'బషీరాబాద్ (Basheerabad)',
    'యాలాల (Yelal)',
    'పెద్దేముల్ (Peddemul)',
    'కొడంగల్ (Kodangal)',
    'బొంరాస్‌పేట్ (Bomraspet)',
    'దౌల్తాబాద్ (Doulthabad)',
    'దుద్యాల (Dudyal)'
  ],
  'వనపర్తి (Wanaparthy)': [
    'వనపర్తి (Wanaparthy)',
    'గోపాల్‌పేట (Gopalpeta)',
    'పెద్దమందడి (Peddamandadi)',
    'ఖిల్లా ఘన్‌పూర్ (Ghanpur Khilla)',
    'పాంగల్ (Pangal)',
    'పెబ్బేరు (Pebbair)',
    'శ్రీరంగాపూర్ (Srirangapur)',
    'వీపనగండ్ల (Veepanagandla)',
    'చిన్నంబావి (Chinnambavi)',
    'కొత్తకోట (Kothakota)',
    'మదనపూర్ (Madanapur)',
    'ఆత్మకూరు (Atmakur)',
    'అమరచింత (Amarchinta)',
    'రేవల్లి (Revally)',
    'ఏదుల (Edula)'
  ],
  'వరంగల్ (Warangal)': [
    'వరంగల్ (Warangal)',
    'ఖిలా వరంగల్ (Khila Warangal)',
    'గీసుకొండ (Geesugonda)',
    'సంగెం (Sangem)',
    'పర్వతగిరి (Parvathagiri)',
    'వర్ధన్నపేట (Wardhannapet)',
    'రాయపర్తి (Rayaparthy)',
    'నర్సంపేట (Narsampet)',
    'చెన్నారావుపేట (Chennaraopet)',
    'నల్లబెల్లి (Nallabelly)',
    'దుగ్గొండి (Duggondi)',
    'ఖానాపూర్ (Khanapur)',
    'నెక్కొండ (Nekkonda)'
  ],
  'యాదాద్రి భువనగిరి (Yadadri Bhuvanagiri)': [
    'భువనగిరి (Bhongir)',
    'ఆలేరు (Alair)',
    'యాదగిరిగుట్ట (Yadagirigutta)',
    'తుర్కపల్లి (Turkapally)',
    'రాజాపేట (Rajapet)',
    'బొమ్మలరామారం (Bommalaramaram)',
    'బీబీనగర్ (Bibinagar)',
    'మోటకొండూరు (Motakondur)',
    'మోత్కూరు (Mothkur)',
    'ఆత్మకూరు ఎం (Atmakur M)',
    'అడ్డగూడూరు (Addaguduru)',
    'గుండాల (Gundala)',
    'చౌటుప్పల్ (Choutuppal)',
    'భూదాన్ పోచంపల్లి (Bhoodan Pochampally)',
    'రామన్నపేట (Ramannapet)',
    'వలిగొండ (Valigonda)',
    'నారాయణపూర్ (Narayanpur)'
  ]
};

// Complete Directory of All 28 States and 8 Union Territories of India from 2022 Official Gazette
export const ALL_INDIA_STATES_INFO = [
  { no: 1, state: 'Andhra Pradesh', nameTe: 'ఆంధ్రప్రదేశ్', capital: 'Amaravati / Hyderabad', founded: '1 Nov. 1956' },
  { no: 2, state: 'Arunachal Pradesh', nameTe: 'అరుణాచల్ ప్రదేశ్', capital: 'Itanagar', founded: '20 Feb. 1987' },
  { no: 3, state: 'Assam', nameTe: 'అస్సాం', capital: 'Dispur', founded: '26 Jan. 1950' },
  { no: 4, state: 'Bihar', nameTe: 'బీహార్', capital: 'Patna', founded: '26 Jan. 1950' },
  { no: 5, state: 'Chhattisgarh', nameTe: 'ఛత్తీస్‌గఢ్', capital: 'Raipur', founded: '1 Nov. 2000' },
  { no: 6, state: 'Goa', nameTe: 'గోవా', capital: 'Panaji', founded: '30 May. 1987' },
  { no: 7, state: 'Gujarat', nameTe: 'గుజరాత్', capital: 'Gandhinagar', founded: '1 May. 1960' },
  { no: 8, state: 'Haryana', nameTe: 'హర్యానా', capital: 'Chandigarh', founded: '1 Nov. 1966' },
  { no: 9, state: 'Himachal Pradesh', nameTe: 'హిమాచల్ ప్రదేశ్', capital: 'Shimla', founded: '25 Jan. 1971' },
  { no: 10, state: 'Mizoram', nameTe: 'మిజోరం', capital: 'Aizwal', founded: '20 Feb. 1987' },
  { no: 11, state: 'Jharkhand', nameTe: 'జార్ఖండ్', capital: 'Ranchi', founded: '15 Nov. 2000' },
  { no: 12, state: 'Karnataka', nameTe: 'కర్ణాటక', capital: 'Bangalore', founded: '1 Nov. 1956' },
  { no: 13, state: 'Kerala', nameTe: 'కేరళ', capital: 'Thiruvananthapuram', founded: '1 Nov. 1956' },
  { no: 14, state: 'Madhya Pradesh', nameTe: 'మధ్యప్రదేశ్', capital: 'Bhopal', founded: '1 Nov. 1956' },
  { no: 15, state: 'Maharashtra', nameTe: 'మహారాష్ట్ర', capital: 'Mumbai', founded: '1 May. 1960' },
  { no: 16, state: 'Manipur', nameTe: 'మణిపూర్', capital: 'Imphal', founded: '21 Jan. 1972' },
  { no: 17, state: 'Meghalaya', nameTe: 'మేఘాలయ', capital: 'Shillong', founded: '21 Jan. 1972' },
  { no: 18, state: 'Nagaland', nameTe: 'నాగాలాండ్', capital: 'Kohima', founded: '1 Dec. 1963' },
  { no: 19, state: 'Odisha', nameTe: 'ఒడిశా', capital: 'Bhubaneswar', founded: '26 Jan. 1950' },
  { no: 20, state: 'Punjab', nameTe: 'పంజాబ్', capital: 'Chandigarh', founded: '1 Nov. 1956' },
  { no: 21, state: 'Rajasthan', nameTe: 'రాజస్థాన్', capital: 'Jaipur', founded: '1 Nov. 1956' },
  { no: 22, state: 'Sikkim', nameTe: 'సిక్కిం', capital: 'Gangtok', founded: '16 May. 1975' },
  { no: 23, state: 'Tamil Nadu', nameTe: 'తమిళనాడు', capital: 'Chennai', founded: '26 Jan. 1950' },
  { no: 24, state: 'Tripura', nameTe: 'త్రిపుర', capital: 'Agartala', founded: '21 Jan. 1972' },
  { no: 25, state: 'Telangana', nameTe: 'తెలంగాణ', capital: 'Hyderabad', founded: '2 Jun. 2014' },
  { no: 26, state: 'Uttar Pradesh', nameTe: 'ఉత్తరప్రదేశ్', capital: 'Lucknow', founded: '26 Jan. 1950' },
  { no: 27, state: 'Uttarakhand', nameTe: 'ఉత్తరాఖండ్', capital: 'Dehradun', founded: '9 Nov. 2000' },
  { no: 28, state: 'West Bengal', nameTe: 'పశ్చిమ బెంగాల్', capital: 'Kolkatta', founded: '1 Nov. 1956' },
];

export const ALL_INDIA_UNION_TERRITORIES_INFO = [
  { no: 1, ut: 'Andaman and Nicobar Islands', nameTe: 'అండమాన్ & నికోబార్ దీవులు', capital: 'Port Blair', founded: '1 Nov. 1956' },
  { no: 2, ut: 'Chandigarh', nameTe: 'చండీగఢ్', capital: 'Chandigarh', founded: '1 Nov. 1966' },
  { no: 3, ut: 'Dadra & Nagar Haveli and Daman & Diu', nameTe: 'దాద్రా & నగర్ హవేలి మరియు డామన్ & డయ్యూ', capital: 'Daman', founded: '26 Jan. 2020' },
  { no: 4, ut: 'Delhi', nameTe: 'ఢిల్లీ (New Delhi)', capital: 'New Delhi', founded: '9 May. 1905' },
  { no: 5, ut: 'Jammu and Kashmir', nameTe: 'జమ్మూ & కాశ్మీర్', capital: 'Srinagar / Jammu', founded: '31 Oct 2019' },
  { no: 6, ut: 'Lakshadweep', nameTe: 'లక్షద్వీప్', capital: 'Kavaratti', founded: '1 Nov. 1956' },
  { no: 7, ut: 'Puducherry', nameTe: 'పుదుచ్చేరి', capital: 'Pondicherry', founded: '1 Nov. 1954' },
  { no: 8, ut: 'Ladakh', nameTe: 'లడఖ్', capital: 'Leh', founded: '31 Oct 2019' },
];

// All remaining 26 States & 8 Union Territories with Districts and Mandals/Tehsils
export const NATIONAL_STATES_AND_UTS: Record<string, Record<string, string[]>> = {
  'అరుణాచల్ ప్రదేశ్ (Arunachal Pradesh)': {
    'పాపుం పారే / ఇటానగర్ (Papum Pare - Itanagar)': [
      'ఇటానగర్ (Itanagar)',
      'నహర్లగూన్ (Naharlagun)',
      'దోయిముఖ్ (Doimukh)',
      'బాందర్‌దేవా (Banderdewa)',
      'బలిజాన్ (Balijan)',
      'సాగిలీ (Sagalee)'
    ],
    'తవాంగ్ (Tawang)': [
      'తవాంగ్ (Tawang)',
      'జాంగ్ (Jang)',
      'లుమ్లా (Lumla)',
      'ముక్తో (Mukto)',
      'కిత్పి (Kitpi)'
    ],
    'వెస్ట్ కామెంగ్ (West Kameng - Bomdila)': [
      'బొమ్డిలా (Bomdila)',
      'దిరాంగ్ (Dirang)',
      'రూపా (Rupa)',
      'భలుక్‌పాంగ్ (Bhalukpong)',
      'సింగచుంగ్ (Singchung)'
    ],
    'ఈస్ట్ సియాంగ్ (East Siang - Pasighat)': [
      'పాసిఘాట్ (Pasighat)',
      'రుక్సిన్ (Ruksin)',
      'మెబో (Mebo)',
      'రానిఘాట్ (Ranaghat)'
    ],
    'లోయర్ సుబన్సిరి (Lower Subansiri - Ziro)': [
      'జిరో (Ziro)',
      'యాచూలి (Yachuli)',
      'ఓల్డ్ జిరో (Old Ziro)',
      'పిస్తానా (Pistana)'
    ],
    'చాంగ్లాంగ్ (Changlang)': [
      'చాంగ్లాంగ్ (Changlang)',
      'మియావో (Miao)',
      'జైరాంపూర్ (Jairampur)',
      'బోర్డుమ్సా (Bordumsa)'
    ]
  },
  'అస్సాం (Assam)': {
    'కామరూప్ మెట్రోపాలిటన్ (Kamrup Metropolitan - Guwahati)': [
      'దిస్పూర్ (Dispur - Capital)',
      'గౌహతి సెంట్రల్ (Guwahati Central)',
      'జలుక్‌బరి (Jalukbari)',
      'పాల్టాన్ బజార్ (Paltan Bazar)',
      'నారంగి (Narengi)',
      'సోనాపూర్ (Sonapur)',
      'చంద్రపూర్ (Chandrapur)'
    ],
    'దిబ్రూగఢ్ (Dibrugarh)': [
      'దిబ్రూగఢ్ వెస్ట్ (Dibrugarh West)',
      'దిబ్రూగఢ్ ఈస్ట్ (Dibrugarh East)',
      'చబ్వా (Chabua)',
      'మోరన్ (Moran)',
      'నహర్‌కటియా (Naharkatiya)',
      'టింగ్‌ఖాంగ్ (Tingkhong)'
    ],
    'కచార్ (Cachar - Silchar)': [
      'సిల్చార్ (Silchar)',
      'ఉదార్‌బండ్ (Udharbond)',
      'సోనాయ్ (Sonai)',
      'లఖీపూర్ (Lakhipur)',
      'కటిగోరా (Katigorah)'
    ],
    'జోర్హాట్ (Jorhat)': [
      'జోర్హాట్ అర్బన్ (Jorhat Urban)',
      'మరియాని (Mariani)',
      'టిటాబార్ (Titabor)',
      'తేయోక్ (Teok)'
    ],
    'నాగావ్ (Nagaon)': [
      'నాగావ్ టౌన్ (Nagaon Town)',
      'రహా (Raha)',
      'ధులింగ్ (Dhing)',
      'కలియాబోర్ (Kaliabor)',
      'సమగురి (Samaguri)'
    ],
    'సోనిత్‌పూర్ (Sonitpur - Tezpur)': [
      'తేజ్‌పూర్ (Tezpur)',
      'ధేక్యాజులి (Dhekiajuli)',
      'బిశ్వనాథ్ (Biswanath)',
      'జాముగురిహట్ (Jamugurihat)'
    ]
  },
  'బీహార్ (Bihar)': {
    'పాట్నా (Patna)': [
      'పాట్నా సదర్ (Patna Sadar)',
      'దానాపూర్ (Danapur)',
      'ఫతుహా (Fatuha)',
      'బక్తియార్‌పూర్ (Bakhtiarpur)',
      'బార్హ్ (Barh)',
      'మోకామా (Mokama)',
      'బిహ్తా (Bihta)',
      'ఫుల్వారీ షరీఫ్ (Phulwari Sharif)',
      'మనేర్ (Maner)'
    ],
    'గయా (Gaya)': [
      'గయా టౌన్ (Gaya Town)',
      'బోధ్‌గయ (Bodh Gaya)',
      'షెర్ఘటి (Sherghati)',
      'టెకారి (Tekari)',
      'వజీర్‌గంజ్ (Wazirganj)',
      'బరాచట్టి (Barachatti)'
    ],
    'ముజఫర్‌పూర్ (Muzaffarpur)': [
      'ముజఫర్‌పూర్ ఈస్ట్ (Muzaffarpur East)',
      'ముజఫర్‌పూర్ వెస్ట్ (Muzaffarpur West)',
      'కంతి (Kanti)',
      'మోతిపూర్ (Motipur)',
      'సక్ర (Sakra)',
      'సాహెబ్‌గంజ్ (Sahebganj)'
    ],
    'భాగల్పూర్ (Bhagalpur)': [
      'భాగల్పూర్ అర్బన్ (Bhagalpur Urban)',
      'కహల్‌గావ్ (Kahalgaon)',
      'సుల్తాన్‌గంజ్ (Sultanganj)',
      'నౌగచియా (Naugachia)',
      'పీర్‌పైంటి (Pirpainti)'
    ],
    'పూర్ణియా (Purnia)': [
      'పూర్ణియా ఈస్ట్ (Purnia East)',
      'బన్మంఖి (Banmankhi)',
      'కస్బా (Kasba)',
      'ధమ్‌దాహా (Dhamdaha)',
      'రూపౌలి (Rupauli)'
    ],
    'దర్భంగా (Darbhanga)': [
      'దర్భంగా సదర్ (Darbhanga Sadar)',
      'బహేరి (Baheri)',
      'హయాఘాట్ (Hayaghat)',
      'బెనిపూర్ (Benipur)',
      'కేవతి (Keoti)'
    ],
    'నలంద (Nalanda - Bihar Sharif)': [
      'బీహార్ షరీఫ్ (Bihar Sharif)',
      'రాజ్‌గిర్ (Rajgir)',
      'నలంద (Nalanda)',
      'హిల్‌సా (Hilsa)',
      'ఇస్లాంపూర్ (Islampur)'
    ],
    'వైశాలి (Vaishali - Hajipur)': [
      'హాజీపూర్ (Hajipur)',
      'మహువా (Mahuwa)',
      'లాల్‌గంజ్ (Lalganj)',
      'వైశాలి (Vaishali)',
      'బిదుపూర్ (Bidupur)'
    ]
  },
  'ఛత్తీస్‌గఢ్ (Chhattisgarh)': {
    'రాయ్‌పూర్ (Raipur)': [
      'రాయ్‌పూర్ అర్బన్ (Raipur Urban)',
      'రాయ్‌పూర్ రూరల్ (Raipur Rural)',
      'అరంగ్ (Arang)',
      'అభన్‌పూర్ (Abhanpur)',
      'ధార్సివా (Dharsiwa)',
      'తిల్దా (Tilda Neora)'
    ],
    'దుర్గ్ (Durg - Bhilai)': [
      'భిలాయ్ నగర్ (Bhilai Nagar)',
      'దుర్గ్ అర్బన్ (Durg Urban)',
      'పటాన్ (Patan)',
      'ధంధా (Dhamdha)',
      'కుమ్హరి (Kumhari)'
    ],
    'బిలాస్‌పూర్ (Bilaspur)': [
      'బిలాస్‌పూర్ సిటీ (Bilaspur City)',
      'బోద్రి (Bodri)',
      'బిల్హా (Bilha)',
      'కోటా (Kota)',
      'తఖత్‌పూర్ (Takhatpur)',
      'మస్తురి (Masturi)'
    ],
    'బస్తర్ (Bastar - Jagdalpur)': [
      'జగదల్‌పూర్ (Jagdalpur)',
      'బస్తర్ (Bastar)',
      'తోకాపాల్ (Tokapal)',
      'బకవాండ్ (Bakawand)',
      'లోహండిగుడ (Lohandiguda)'
    ],
    'కోర్బా (Korba)': [
      'కోర్బా అర్బన్ (Korba Urban)',
      'కట్ఘోరా (Katghora)',
      'పాలి (Pali)',
      'కర్తల (Kartala)',
      'పౌండి ఉపరోరా (Poundi Uproda)'
    ],
    'రాజ్‌నంద్‌గావ్ (Rajnandgaon)': [
      'రాజ్‌నంద్‌గావ్ అర్బన్ (Rajnandgaon Urban)',
      'డోంగర్‌గఢ్ (Dongargarh)',
      'డోంగర్‌గావ్ (Dongargaon)',
      'ఖైరాగఢ్ (Khairagarh)'
    ]
  },
  'గోవా (Goa)': {
    'ఉత్తర గోవా (North Goa - Panaji)': [
      'పనాజీ / తిస్వాడి (Panaji / Tiswadi)',
      'బార్దేజ్ / మాపుసా (Bardez - Mapusa)',
      'పెర్నెమ్ (Pernem)',
      'బిచోలిమ్ (Bicholim)',
      'సత్తారి / వాల్పోయ్ (Sattari - Valpoi)'
    ],
    'దక్షిణ గోవా (South Goa - Margao)': [
      'సాల్సెట్ / మడ్గావ్ (Salcete - Margao)',
      'మోర్ముగావ్ / వాస్కో (Mormugao - Vasco da Gama)',
      'పోండా (Ponda)',
      'క్యూపెమ్ (Quepem)',
      'సంగ్వెమ్ (Sanguem)',
      'కెనకోనా (Canacona)'
    ]
  },
  'గుజరాత్ (Gujarat)': {
    'గాంధీనగర్ (Gandhinagar)': [
      'గాంధీనగర్ అర్బన్ (Gandhinagar Urban)',
      'కలోల్ (Kalol)',
      'దహేగామ్ (Dahegam)',
      'మాన్సా (Mansa)'
    ],
    'అహ్మదాబాద్ (Ahmedabad)': [
      'అహ్మదాబాద్ సెంట్రల్ (Ahmedabad Central)',
      'మణినగర్ (Maninagar)',
      'నవరంగ్‌పురా (Navrangpura)',
      'బోపాల్ / ఘుమా (Bopal / Ghuma)',
      'ధోల్కా (Dholka)',
      'సనంద్ (Sanand)',
      'విరంగం (Viramgam)'
    ],
    'సూరత్ (Surat)': [
      'సూరత్ అర్బన్ (Surat Urban)',
      'వరచ్చా (Varachha)',
      'అదాజన్ (Adajan)',
      'కటార్‌గాం (Katargam)',
      'బార్డోలి (Bardoli)',
      'చోర్యాసి (Choryasi)',
      'మజురా (Majura)'
    ],
    'వడోదర (Vadodara)': [
      'వడోదర సిటీ (Vadodara City)',
      'అల్కాపురి (Alkapuri)',
      'పద్ర (Padra)',
      'కర్జన్ (Karjan)',
      'దభోయి (Dabhoi)',
      'వాఘోడియా (Waghodia)'
    ],
    'రాజ్‌కోట్ (Rajkot)': [
      'రాజ్‌కోట్ సిటీ (Rajkot City)',
      'గోండల్ (Gondal)',
      'జేత్‌పూర్ (Jetpur)',
      'ధోరాజీ (Dhoraji)',
      'మోర్బీ రోడ్ (Morbi Road)'
    ],
    'కచ్ (Kutch - Bhuj)': [
      'భుజ్ (Bhuj)',
      'గాంధీధామ్ (Gandhidham)',
      'మాండ్వి (Mandvi)',
      'అంజార్ (Anjar)',
      'ముంద్రా (Mundra)'
    ]
  },
  'హర్యానా (Haryana)': {
    'గురుగ్రామ్ (Gurugram)': [
      'గురుగ్రామ్ సదర్ (Gurugram Sadar)',
      'సైబర్ సిటీ (Cyber City)',
      'మానేసర్ (Manesar)',
      'సోహ్నా (Sohna)',
      'పటౌడీ (Pataudi)',
      'బాద్షాపూర్ (Badshahpur)'
    ],
    'ఫరీదాబాద్ (Faridabad)': [
      'ఫరీదాబాద్ అర్బన్ (Faridabad Urban)',
      'బల్లబ్‌గఢ్ (Ballabhgarh)',
      'బద్ఖల్ (Badkhal)',
      'టిగావ్ (Tigaon)'
    ],
    'పంచకుల (Panchkula)': [
      'పంచకుల అర్బన్ (Panchkula Urban)',
      'కాల్కా (Kalka)',
      'పింజోర్ (Pinjore)',
      'రాయ్‌పూర్ రాణి (Raipur Rani)'
    ],
    'అంబాలా (Ambala)': [
      'అంబాలా సిటీ (Ambala City)',
      'అంబాలా కంటోన్మెంట్ (Ambala Cantt)',
      'బరాడా (Barara)',
      'నారాయణ్‌గఢ్ (Naraingarh)'
    ],
    'కర్నాల్ (Karnal)': [
      'కర్నాల్ అర్బన్ (Karnal Urban)',
      'ఇంద్రి (Indri)',
      'ఘరౌండా (Gharaunda)',
      'అసంధ్ (Assandh)',
      'నీలోఖేరి (Nilokheri)'
    ],
    'పానిపట్ (Panipat)': [
      'పానిపట్ అర్బన్ (Panipat Urban)',
      'సమాల్ఖా (Samalkha)',
      'ఇస్రానా (Israna)',
      'బాపోలి (Bapoli)'
    ],
    'రోహ్‌తక్ (Rohtak)': [
      'రోహ్‌తక్ అర్బన్ (Rohtak Urban)',
      'సాంప్లా (Sampla)',
      'మెహమ్ (Meham)',
      'కలనౌర్ (Kalanaur)'
    ]
  },
  'హిమాచల్ ప్రదేశ్ (Himachal Pradesh)': {
    'సిమ్లా (Shimla)': [
      'సిమ్లా అర్బన్ (Shimla Urban)',
      'సిమ్లా రూరల్ (Shimla Rural)',
      'థియోగ్ (Theog)',
      'రాంపూర్ (Rampur)',
      'రోహ్రు (Rohru)',
      'కుమార్సైన్ (Kumarsain)',
      'చోపాల్ (Chopal)'
    ],
    'కాంగ్రా (Kangra - Dharamshala)': [
      'ధర్మశాల (Dharamshala)',
      'కాంగ్రా (Kangra)',
      'పాలంపూర్ (Palampur)',
      'నూర్పూర్ (Nurpur)',
      'దేహ్రా గోపీపూర్ (Dehra Gopipur)',
      'జవాలాముఖి (Jawalamukhi)'
    ],
    'కులు (Kullu - Manali)': [
      'కులు టౌన్ (Kullu Town)',
      'మనాలి (Manali)',
      'బంజార్ (Banjar)',
      'అన్నీ (Anni)',
      'నిర్మంద్ (Nirmand)'
    ],
    'మండి (Mandi)': [
      'మండి అర్బన్ (Mandi Urban)',
      'సుందర్‌నగర్ (Sundernagar)',
      'జోగిందర్‌నగర్ (Jogindernagar)',
      'సర్కాఘాట్ (Sarkaghat)',
      'గోహర్ (Gohar)'
    ],
    'సోలన్ (Solan)': [
      'సోలన్ టౌన్ (Solan Town)',
      'కసౌలి (Kasauli)',
      'నాలాగఢ్ (Nalagarh)',
      'కందఘాట్ (Kandaghat)',
      'బద్దీ (Baddi)'
    ]
  },
  'జార్ఖండ్ (Jharkhand)': {
    'రాంచీ (Ranchi)': [
      'రాంచీ అర్బన్ (Ranchi Urban)',
      'కాంకే (Kanke)',
      'హతియా (Hatia)',
      'బుండు (Bundu)',
      'ఒరమాంజి (Ormanjhi)',
      'నగ్రి (Nagri)',
      'సిల్లీ (Silli)'
    ],
    'తూర్పు సింగ్‌భూమ్ (East Singhbhum - Jamshedpur)': [
      'జంషెడ్‌పూర్ అర్బన్ (Jamshedpur Urban)',
      'ఘాట్‌శిలా (Ghatshila)',
      'పోట్కా (Potka)',
      'బహరాగోరా (Baharagora)',
      'ముసాబని (Musabani)'
    ],
    'ధన్‌బాద్ (Dhanbad)': [
      'ధన్‌బాద్ అర్బన్ (Dhanbad Urban)',
      'ఝరియా (Jharia)',
      'బాఘ్‌మారా (Baghmara)',
      'నిర్సా (Nirsa)',
      'గోవింద్‌పూర్ (Govindpur)'
    ],
    'బొకారో (Bokaro)': [
      'బొకారో స్టీల్ సిటీ (Bokaro Steel City)',
      'చాస్ (Chas)',
      'బెర్మో (Bermo)',
      'గోమియా (Gomia)',
      'చందన్‌కయారి (Chandankiyari)'
    ],
    'దేవ్‌ఘర్ (Deoghar)': [
      'దేవ్‌ఘర్ అర్బన్ (Deoghar Urban)',
      'మధుపూర్ (Madhupur)',
      'సారథ్ (Sarath)',
      'మోహన్‌పూర్ (Mohanpur)'
    ],
    'హజారీబాగ్ (Hazaribagh)': [
      'హజారీబాగ్ టౌన్ (Hazaribagh Town)',
      'బార్హి (Barhi)',
      'బర్కగావ్ (Barkagaon)',
      'చౌపారన్ (Chauparan)'
    ]
  },
  'కర్ణాటక (Karnataka)': {
    'బెంగళూరు అర్బన్ (Bengaluru Urban)': [
      'బెంగళూరు సెంట్రల్ (Bengaluru Central)',
      'కోరమంగళ (Koramangala)',
      'వైట్‌ఫీల్డ్ (Whitefield)',
      'ఇందిరానగర్ (Indiranagar)',
      'మల్లేశ్వరం (Malleswaram)',
      'జయనగర్ (Jayanagar)',
      'యలహంక (Yelahanka)',
      'ఎలక్ట్రానిక్ సిటీ (Electronic City)'
    ],
    'మైసూరు (Mysuru)': [
      'మైసూరు నార్త్ (Mysuru North)',
      'మైసూరు సౌత్ (Mysuru South)',
      'నంజనగూడు (Nanjangud)',
      'హుణసూరు (Hunsur)',
      'టి. నరసీపుర (T. Narasipura)'
    ],
    'దక్షిణ కన్నడ (Dakshina Kannada - Mangaluru)': [
      'మంగళూరు సిటీ (Mangaluru City)',
      'బంట్వాళ (Bantwal)',
      'పుత్తూరు (Puttur)',
      'బెళ్తంగడి (Belthangady)',
      'సుళ్ళియా (Sullia)'
    ],
    'ధార్వాడ్ (Dharwad - Hubballi)': [
      'హుబ్బళ్లి అర్బన్ (Hubballi Urban)',
      'ధార్వాడ్ టౌన్ (Dharwad Town)',
      'కుందగోళ (Kundgol)',
      'నవలగుంద (Navalgund)',
      'కల్ఘట్గి (Kalghatgi)'
    ],
    'బెళగావి (Belagavi)': [
      'బెళగావి సిటీ (Belagavi City)',
      'గోకాక్ (Gokak)',
      'చిక్కోడి (Chikkodi)',
      'బైల్‌హొంగల్ (Bailhongal)',
      'అథణి (Athani)'
    ],
    'బళ్లారి (Ballari)': [
      'బళ్లారి సిటీ (Ballari City)',
      'సిరుగుప్ప (Siruguppa)',
      'కురుగోడు (Kurugodu)',
      'సండూరు (Sandur)'
    ]
  },
  'కేరళ (Kerala)': {
    'తిరువనంతపురం (Thiruvananthapuram)': [
      'తిరువనంతపురం సెంట్రల్ (Thiruvananthapuram Central)',
      'నెయ్యట్టింకర (Neyyattinkara)',
      'నెడుమంగడ్ (Nedumangad)',
      'వర్కల (Varkala)',
      'కట్టకడ (Kattakada)',
      'చిరయిన్‌కీజు (Chirayinkeezhu)'
    ],
    'ఎర్నాకుళం (Ernakulam - Kochi)': [
      'కొచ్చి / ఎర్నాకుళం (Kochi / Ernakulam)',
      'అలువా (Aluva)',
      'కనయన్నూరు (Kanayannur)',
      'కొథమంగళం (Kothamangalam)',
      'మువట్టుపుళ (Muvattupuzha)',
      'పరవూర్ (Paravur)'
    ],
    'కోజికోడ్ (Kozhikode - Calicut)': [
      'కోజికోడ్ టౌన్ (Kozhikode Town)',
      'వటకర (Vatakara)',
      'కోయిలాండి (Koyilandy)',
      'తామరస్సేరి (Thamarassery)'
    ],
    'త్రిసూర్ (Thrissur)': [
      'త్రిసూర్ అర్బన్ (Thrissur Urban)',
      'చాలకుడి (Chalakudy)',
      'కొడంగల్లూరు (Kodungallur)',
      'ముకుందపురం (Mukundapuram)',
      'తలపిల్లి (Thalapilly)'
    ],
    'పాలక్కాడ్ (Palakkad)': [
      'పాలక్కాడ్ టౌన్ (Palakkad Town)',
      'ఒట్టపాలం (Ottapalam)',
      'చిత్తూరు (Chittur)',
      'ఆలత్తూరు (Alathur)',
      'మన్నార్క్కాడ్ (Mannarkkad)'
    ],
    'మలప్పురం (Malappuram)': [
      'మలప్పురం టౌన్ (Malappuram Town)',
      'మంజేరి (Manjeri)',
      'పెరింతల్మన్న (Perinthalmanna)',
      'తిరూర్ (Tirur)',
      'పొన్నాని (Ponnani)'
    ]
  },
  'మధ్యప్రదేశ్ (Madhya Pradesh)': {
    'భోపాల్ (Bhopal)': [
      'భోపాల్ అర్బన్ (Bhopal Urban)',
      'హుజూర్ (Huzur)',
      'బైరాసియా (Berasia)',
      'కోలార్ (Kolar)',
      'గోవిందపుర (Govindpura)'
    ],
    'ఇండోర్ (Indore)': [
      'ఇండోర్ సిటీ (Indore City)',
      'మహు / అంబేద్కర్ నగర్ (Mhow)',
      'సాన్వెర్ (Sanwer)',
      'దేపాల్పూర్ (Depalpur)',
      'హాటోద్ (Hatod)'
    ],
    'గ్వాలియర్ (Gwalior)': [
      'గ్వాలియర్ అర్బన్ (Gwalior Urban)',
      'మోరార్ (Morar)',
      'దబ్రా (Dabra)',
      'భితర్వార్ (Bhitarwar)',
      'ఘాటిగావ్ (Ghatigaon)'
    ],
    'జబల్‌పూర్ (Jabalpur)': [
      'జబల్‌పూర్ అర్బన్ (Jabalpur Urban)',
      'పనగర్ (Panagar)',
      'సిహోరా (Sihora)',
      'పటాన్ (Patan)',
      'షాపురా (Shahpura)'
    ],
    'ఉజ్జయిని (Ujjain)': [
      'ఉజ్జయిని సిటీ (Ujjain City)',
      'మహిద్పూర్ (Mahidpur)',
      'తరన (Tarana)',
      'ఖచ్రోడ్ (Khachrod)',
      'బద్నగర్ (Badnagar)'
    ],
    'సాగర్ (Sagar)': [
      'సాగర్ అర్బన్ (Sagar Urban)',
      'బీనా (Bina)',
      'ఖురాయ్ (Khurai)',
      'రెహ్లి (Rehli)',
      'డియోరి (Deori)'
    ]
  },
  'మహారాష్ట్ర (Maharashtra)': {
    'ముంబై (Mumbai)': [
      'ముంబై సిటీ (Mumbai City)',
      'బాంద్రా (Bandra)',
      'అంధేరి (Andheri)',
      'బోరివిలి (Borivali)',
      'దాదర్ (Dadar)',
      'కుర్లా (Kurla)',
      'ఘాట్‌కోపర్ (Ghatkopar)'
    ],
    'పుణే (Pune)': [
      'పుణే సిటీ (Pune City)',
      'శివాజీనగర్ (Shivajinagar)',
      'కొత్రూడ్ (Kothrud)',
      'హింజవాడి (Hinjawadi)',
      'హడప్సర్ (Hadapsar)',
      'పింప్రి-చించ్వాడ్ (Pimpri-Chinchwad)',
      'బారామతి (Baramati)'
    ],
    'థానే (Thane)': [
      'థానే సిటీ (Thane City)',
      'కళ్యాణ్ (Kalyan)',
      'డోంబివలి (Dombivli)',
      'మీరా-భాయిందర్ (Mira-Bhayandar)',
      'భివండి (Bhiwandi)',
      'ఉల్హాస్‌నగర్ (Ulhasnagar)'
    ],
    'నాగ్‌పూర్ (Nagpur)': [
      'నాగ్‌పూర్ అర్బన్ (Nagpur Urban)',
      'నాగ్‌పూర్ రూరల్ (Nagpur Rural)',
      'కామ్తి (Kamptee)',
      'హింగ్నా (Hingna)',
      'కాటోల్ (Katol)',
      'ఉమ్రేడ్ (Umred)'
    ],
    'నాసిక్ (Nashik)': [
      'నాసిక్ సిటీ (Nashik City)',
      'మలేగావ్ (Malegaon)',
      'సిన్నార్ (Sinnar)',
      'నిఫాడ్ (Niphad)',
      'ఇగత్‌పురి (Igatpuri)'
    ],
    'ఛత్రపతి శంభాజీనగర్ / ఔరంగాబాద్ (Chhatrapati Sambhajinagar)': [
      'ఔరంగాబాద్ అర్బన్ (Aurangabad Urban)',
      'పైథాన్ (Paithan)',
      'గంగాపూర్ (Gangapur)',
      'వైజాపూర్ (Vaijapur)',
      'సిల్లోడ్ (Sillod)'
    ]
  },
  'మణిపూర్ (Manipur)': {
    'ఇంఫాల్ వెస్ట్ (Imphal West)': [
      'లంఫెల్‌పట్ (Lamphelpat - Imphal)',
      'పాత్సోయ్ (Patsoi)',
      'లంసాంగ్ (Lamsang)',
      'వాంగోయ్ (Wangoi)'
    ],
    'ఇంఫాల్ ఈస్ట్ (Imphal East)': [
      'పోరోంపట్ (Porompat)',
      'సవాంబంగ్ (Sawombung)',
      'కీరావ్ వాంగ్‌ఖేమ్ (Keirao Wangkhem)'
    ],
    'చురాచాంద్‌పూర్ (Churachandpur)': [
      'చురాచాంద్‌పూర్ టౌన్ (Churachandpur Town)',
      'తుయిబాంగ్ (Tuibong)',
      'సాంగ్‌కోట్ (Sangaikot)',
      'సింఘట్ (Singngat)'
    ],
    'తౌబాల్ (Thoubal)': [
      'తౌబాల్ అర్బన్ (Thoubal Urban)',
      'లిలాంగ్ (Lilang)',
      'యైరిపోక్ (Yairipok)',
      'కక్చింగ్ రోడ్ (Kakching Road)'
    ]
  },
  'మేఘాలయ (Meghalaya)': {
    'ఈస్ట్ ఖాసీ హిల్స్ (East Khasi Hills - Shillong)': [
      'షిల్లాంగ్ అర్బన్ (Shillong Urban)',
      'మౌఫ్లాంగ్ (Mawphlang)',
      'మౌసిన్‌రామ్ (Mawsynram)',
      'సోహ్రా / చిరపుంజి (Sohra - Cherrapunji)',
      'పైనుర్స్లా (Pynursla)'
    ],
    'వెస్ట్ గారో హిల్స్ (West Garo Hills - Tura)': [
      'తురా టౌన్ (Tura Town)',
      'డాలు (Dalu)',
      'రోంగ్రామ్ (Rongram)',
      'సెల్సెల్లా (Selsella)',
      'టిక్లికిల్లా (Tikrikilla)'
    ],
    'రి-భోయ్ (Ri-Bhoi - Nongpoh)': [
      'నోంగ్‌పోహ్ (Nongpoh)',
      'ఉమియం / బారాపాని (Umiam - Barapani)',
      'ఉమ్స్నింగ్ (Umsning)',
      'జిరాంగ్ (Jirang)'
    ]
  },
  'మిజోరం (Mizoram)': {
    'ఐజ్వాల్ (Aizawl)': [
      'ఐజ్వాల్ నార్త్ (Aizawl North)',
      'ఐజ్వాల్ సౌత్ (Aizawl South)',
      'త్లాంగ్‌నువామ్ (Tlangnuam)',
      'డార్లాన్ (Darlawn)',
      'ఐబాక్ (Aibawk)'
    ],
    'లుంగ్లీ (Lunglei)': [
      'లుంగ్లీ టౌన్ (Lunglei Town)',
      'హ్నాథియాల్ (Hnahthial)',
      'లుంగ్‌సేన్ (Lungsen)',
      'బున్‌ఘ్మున్ (Bunghmun)'
    ],
    'చంపై (Champhai)': [
      'చంపై టౌన్ (Champhai Town)',
      'ఖవ్జాల్ (Khawzawl)',
      'న్గోపా (Ngopa)',
      'జోఖావ్‌థార్ (Zokhawthar)'
    ]
  },
  'నాగాలాండ్ (Nagaland)': {
    'కోహిమా (Kohima)': [
      'కోహిమా అర్బన్ (Kohima Urban)',
      'సీచు-జుబ్జా (Sechu-Zubza)',
      'చీఫోబోజు (Chiephobozou)',
      'జాఖమా (Jakhama)',
      'త్సోమిన్యు (Tseminyu)'
    ],
    'దిమాపూర్ (Dimapur)': [
      'దిమాపూర్ సదర్ (Dimapur Sadar)',
      'చుమౌకెడిమా (Chumoukedima)',
      'మెడ్జిఫెమా (Medziphema)',
      'ధన్సిరిపార్ (Dhansiripar)'
    ],
    'మోకోక్‌చుంగ్ (Mokokchung)': [
      'మోకోక్‌చుంగ్ టౌన్ (Mokokchung Town)',
      'చాంగ్‌టోంగ్యా (Changtongya)',
      'మంగోలెంబా (Mangkolemba)',
      'తులి (Tuli)'
    ]
  },
  'ఒడిశా (Odisha)': {
    'ఖోర్ధా (Khurda - Bhubaneswar)': [
      'భువనేశ్వర్ సెంట్రల్ (Bhubaneswar Central)',
      'ఖోర్ధా టౌన్ (Khurda Town)',
      'జట్నీ (Jatni)',
      'బలిపట్న (Balipatna)',
      'బాణపూర్ (Banapur)',
      'బేగునియా (Begunia)'
    ],
    'కటక్ (Cuttack)': [
      'కటక్ సదర్ (Cuttack Sadar)',
      'చౌద్వార్ (Choudwar)',
      'బంకి (Banki)',
      'అథగఢ్ (Athagarh)',
      'సాలెపూర్ (Salepur)',
      'బరంగా (Baranga)'
    ],
    'గంజాం (Ganjam - Berhampur)': [
      'బెర్హంపూర్ (Berhampur)',
      'ఛత్రపూర్ (Chhatrapur)',
      'భంజనగర్ (Bhanjanagar)',
      'హింజిలికట్ (Hinjilicut)',
      'అస్కా (Aska)'
    ],
    'పూరీ (Puri)': [
      'పూరీ టౌన్ (Puri Town)',
      'కోణార్క్ (Konark)',
      'పిపిలి (Pipili)',
      'సత్యబడి (Satyabadi)',
      'నిమాపారా (Nimapara)'
    ],
    'సుందర్‌గఢ్ (Sundargarh - Rourkela)': [
      'రూర్కెలా అర్బన్ (Rourkela Urban)',
      'సుందర్‌గఢ్ టౌన్ (Sundargarh Town)',
      'రాజ్‌గంగ్‌పూర్ (Rajgangpur)',
      'బిర్మిత్రపూర్ (Birmitrapur)',
      'బోనై (Bonai)'
    ],
    'సంబల్‌పూర్ (Sambalpur)': [
      'సంబల్‌పూర్ సిటీ (Sambalpur City)',
      'బుర్లా (Burla)',
      'హీరాకుడ్ (Hirakud)',
      'రెధాఖోల్ (Rairakhol)',
      'కుచిందా (Kuchinda)'
    ]
  },
  'పంజాబ్ (Punjab)': {
    'లుధియానా (Ludhiana)': [
      'లుధియానా ఈస్ట్ (Ludhiana East)',
      'లుధియానా వెస్ట్ (Ludhiana West)',
      'ఖన్నా (Khanna)',
      'జగ్రావ్ (Jagraon)',
      'రాయ్‌కోట్ (Raikot)',
      'సాహ్నేవాల్ (Sahnewal)'
    ],
    'అమృత్‌సర్ (Amritsar)': [
      'అమృత్‌సర్ అర్బన్ (Amritsar Urban)',
      'అజ్నాలా (Ajnala)',
      'బాబా బకాల (Baba Bakala)',
      'మజిత (Majitha)',
      'అట్టారి (Attari)'
    ],
    'జలంధర్ (Jalandhar)': [
      'జలంధర్ అర్బన్ (Jalandhar Urban)',
      'ఫిల్లౌర్ (Phillaur)',
      'నకోదర్ (Nakodar)',
      'షాకోట్ (Shahkot)',
      'కర్తార్‌పూర్ (Kartarpur)'
    ],
    'ఎస్‌ఏఎస్ నగర్ / మొహాలీ (SAS Nagar - Mohali)': [
      'మొహాలీ అర్బన్ (Mohali Urban)',
      'ఖరార్ (Kharar)',
      'డేరా బస్సి (Dera Bassi)',
      'జిరక్‌పూర్ (Zirakpur)'
    ],
    'పాటియాలా (Patiala)': [
      'పాటియాలా అర్బన్ (Patiala Urban)',
      'రాజ్‌పురా (Rajpura)',
      'నభా (Nabha)',
      'సమనా (Samana)',
      'పత్రన్ (Patran)'
    ]
  },
  'రాజస్థాన్ (Rajasthan)': {
    'జైపూర్ (Jaipur)': [
      'జైపూర్ అర్బన్ (Jaipur Urban)',
      'జైపూర్ రూరల్ (Jaipur Rural)',
      'ఆమెర్ (Amer)',
      'సంగనేర్ (Sanganer)',
      'చోము (Chomu)',
      'చాక్సు (Chaksu)',
      'విద్యాధర్ నగర్ (Vidyadhar Nagar)'
    ],
    'జోధ్‌పూర్ (Jodhpur)': [
      'జోధ్‌పూర్ అర్బన్ (Jodhpur Urban)',
      'లూని (Luni)',
      'బిలారా (Bilara)',
      'ఫలోడి (Phalodi)',
      'ఒసియాన్ (Osian)'
    ],
    'ఉదయ్‌పూర్ (Udaipur)': [
      'ఉదయ్‌పూర్ సిటీ (Udaipur City)',
      'గిర్వా (Girwa)',
      'సాలంబర్ (Salumbar)',
      'మావ్లీ (Mavli)',
      'వల్లభ్‌నగర్ (Vallabhnagar)'
    ],
    'కోటా (Kota)': [
      'కోటా అర్బన్ (Kota Urban)',
      'లాడ్‌పురా (Ladpura)',
      'డిగోడ్ (Digod)',
      'రామ్‌గంజ్ మండి (Ramganj Mandi)',
      'సాంగోడ్ (Sangod)'
    ],
    'అజ్మీర్ (Ajmer)': [
      'అజ్మీర్ అర్బన్ (Ajmer Urban)',
      'పుష్కర్ (Pushkar)',
      'కిషన్‌గఢ్ (Kishangarh)',
      'బియావర్ (Beawar)',
      'నసీరాబాద్ (Nasirabad)'
    ],
    'బికనేర్ (Bikaner)': [
      'బికనేర్ అర్బన్ (Bikaner Urban)',
      'నోఖా (Nokha)',
      'కోలాయత్ (Kolayat)',
      'శ్రీడుంగర్‌గఢ్ (Sridungargarh)'
    ]
  },
  'సిక్కిం (Sikkim)': {
    'గ్యాంగ్‌టక్ (Gangtok - East Sikkim)': [
      'గ్యాంగ్‌టక్ అర్బన్ (Gangtok Urban)',
      'పాక్యోంగ్ (Pakyong)',
      'రోంగ్లి (Rongli)',
      'రాణిపూల్ (Ranipool)'
    ],
    'నామ్‌చి (Namchi - South Sikkim)': [
      'నామ్‌చి టౌన్ (Namchi Town)',
      'జోరెథాంగ్ (Jorethang)',
      'రవాంగ్లా (Ravangla)',
      'యాంగ్‌గాంగ్ (Yangang)'
    ],
    'గ్యాల్‌షింగ్ (Gyalshing - West Sikkim)': [
      'గ్యాల్‌షింగ్ టౌన్ (Gyalshing Town)',
      'సోరెంగ్ (Soreng)',
      'డెంథామ్ (Dentham)',
      'యుక్సోమ్ (Yuksom)'
    ],
    'మంగన్ (Mangan - North Sikkim)': [
      'మంగన్ టౌన్ (Mangan Town)',
      'చుంగ్‌థాంగ్ (Chungthang)',
      'లచుంగ్ (Lachung)',
      'లాచెన్ (Lachen)'
    ]
  },
  'తమిళనాడు (Tamil Nadu)': {
    'చెన్నై (Chennai)': [
      'చెన్నై సెంట్రల్ (Chennai Central)',
      'టి.నగర్ (T. Nagar)',
      'మైలాపూర్ (Mylapore)',
      'అడయార్ (Adyar)',
      'అన్నా నగర్ (Anna Nagar)',
      'వేళచ్చేరి (Velachery)',
      'గిండి (Guindy)',
      'తాంబరం (Tambaram)'
    ],
    'కోయంబత్తూర్ (Coimbatore)': [
      'కోయంబత్తూర్ నార్త్ (Coimbatore North)',
      'కోయంబత్తూర్ సౌత్ (Coimbatore South)',
      'పొల్లాచ్చి (Pollachi)',
      'మెట్టుపాళయం (Mettupalayam)',
      'సులూరు (Sulur)'
    ],
    'మదురై (Madurai)': [
      'మదురై నార్త్ (Madurai North)',
      'మదురై సౌత్ (Madurai South)',
      'తిరుమంగళం (Thirumangalam)',
      'మేలూర్ (Melur)',
      'ఉసిలంపట్టి (Usilampatti)'
    ],
    'తిరుచిరాపల్లి (Tiruchirappalli)': [
      'తిరుచ్చి ఈస్ట్ (Tiruchi East)',
      'తిరుచ్చి వెస్ట్ (Tiruchi West)',
      'శ్రీరంగం (Srirangam)',
      'లాల్గుడి (Lalgudi)',
      'మణప్పారై (Manapparai)'
    ],
    'సేలం (Salem)': [
      'సేలం అర్బన్ (Salem Urban)',
      'మెట్టూరు (Mettur)',
      'అట్టూరు (Attur)',
      'ఓమలూరు (Omalur)',
      'శంకగిరి (Sankagiri)'
    ],
    'కాంచీపురం (Kanchipuram)': [
      'కాంచీపురం టౌన్ (Kanchipuram Town)',
      'శ్రీపెరంబుదూర్ (Sriperumbudur)',
      'ఉత్తిరమేరూరు (Uthiramerur)',
      'వాలాజాబాద్ (Walajabad)'
    ]
  },
  'త్రిపుర (Tripura)': {
    'పశ్చిమ త్రిపుర (West Tripura - Agartala)': [
      'అగర్తలా అర్బన్ (Agartala Urban)',
      'జిరానియా (Jirania)',
      'మోహన్‌పూర్ (Mohanpur)',
      'మండ్వాయ్ (Mandwi)'
    ],
    'గోమతి (Gomati - Udaipur)': [
      'ఉదయ్‌పూర్ (Udaipur)',
      'అమర్‌పూర్ (Amarpur)',
      'కార్బుక్ (Karbook)'
    ],
    'ధలై (Dhalai - Ambassa)': [
      'అంబాసా (Ambassa)',
      'కమల్‌పూర్ (Kamalpur)',
      'గండుచెర్రా (Gandacherra)',
      'మను (Manu)'
    ],
    'ఉత్తర త్రిపుర (North Tripura - Dharmanagar)': [
      'ధర్మనగర్ (Dharmanagar)',
      'పాణిసాగర్ (Panisagar)',
      'కాంచన్‌పూర్ (Kanchanpur)'
    ]
  },
  'ఉత్తరప్రదేశ్ (Uttar Pradesh)': {
    'లక్నో (Lucknow)': [
      'లక్నో సదర్ (Lucknow Sadar)',
      'హజ్రత్‌గంజ్ (Hazratganj)',
      'గోమతీ నగర్ (Gomti Nagar)',
      'అలీగంజ్ (Aliganj)',
      'బక్షి కా తలాబ్ (Bakshi Ka Talab)',
      'మోహన్‌లాల్‌గంజ్ (Mohanlalganj)',
      'సరోజినీ నగర్ (Sarojini Nagar)'
    ],
    'గౌతమ్ బుద్ధ నగర్ / నోయిడా (Gautam Buddha Nagar - Noida)': [
      'నోయిడా సెంట్రల్ (Noida Central)',
      'గ్రేటర్ నోయిడా (Greater Noida)',
      'దాద్రి (Dadri)',
      'జెవార్ (Jewar)'
    ],
    'వారణాసి (Varanasi)': [
      'వారణాసి అర్బన్ (Varanasi Urban)',
      'పిండ్రా (Pindra)',
      'రాజా తలాబ్ (Raja Talab)',
      'శివ్‌పూర్ (Shivpur)',
      'కాంతీ రోడ్ (Cantt Road)'
    ],
    'కాన్పూర్ నగర్ (Kanpur Nagar)': [
      'కాన్పూర్ సదర్ (Kanpur Sadar)',
      'ఘాటంపూర్ (Ghatampur)',
      'బిల్హౌర్ (Bilhaur)',
      'కళ్యాణ్‌పూర్ (Kalyanpur)',
      'గోవింద్ నగర్ (Govind Nagar)'
    ],
    'ప్రయాగ్‌రాజ్ (Prayagraj - Allahabad)': [
      'ప్రయాగ్‌రాజ్ అర్బన్ (Prayagraj Urban)',
      'ఫూల్‌పూర్ (Phulpur)',
      'సోరాన్ (Soraon)',
      'కరచన (Karchana)',
      'మేజా (Meja)'
    ],
    'ఆగ్రా (Agra)': [
      'ఆగ్రా అర్బన్ (Agra Urban)',
      'ఫతేహాబాద్ (Fatehabad)',
      'బాహ్ (Bah)',
      'ఎత్మాద్‌పూర్ (Etmadpur)',
      'కిరవోలి (Kiraoli)'
    ],
    'ఘజియాబాద్ (Ghaziabad)': [
      'ఘజియాబాద్ అర్బన్ (Ghaziabad Urban)',
      'ఇందిరాపురం (Indirapuram)',
      'మోదీనగర్ (Modinagar)',
      'లోనీ (Loni)'
    ]
  },
  'ఉత్తరాఖండ్ (Uttarakhand)': {
    'డెహ్రాడూన్ (Dehradun)': [
      'డెహ్రాడూన్ అర్బన్ (Dehradun Urban)',
      'రిషికేశ్ (Rishikesh)',
      'వికాస్‌నగర్ (Vikasnagar)',
      'డోయివాలా (Doiwala)',
      'చక్రతా (Chakrata)',
      'ముస్సోరి (Mussoorie)'
    ],
    'హరిద్వార్ (Haridwar)': [
      'హరిద్వార్ అర్బన్ (Haridwar Urban)',
      'రూర్కీ (Roorkee)',
      'లక్సార్ (Laksar)',
      'భగవాన్‌పూర్ (Bhagwanpur)'
    ],
    'నైనిటాల్ (Nainital)': [
      'నైనిటాల్ టౌన్ (Nainital Town)',
      'హల్ద్వానీ (Haldwani)',
      'రామ్‌నగర్ (Ramnagar)',
      'లాల్కువాన్ (Lalkuan)',
      'ధారి (Dhari)'
    ],
    'ఉధమ్ సింగ్ నగర్ (Udham Singh Nagar - Rudrapur)': [
      'రుద్రపూర్ (Rudrapur)',
      'కాశీపూర్ (Kashipur)',
      'కిచ్చా (Kichha)',
      'ఖతిమా (Khatima)',
      'సితార్‌గంజ్ (Sitarganj)'
    ]
  },
  'పశ్చిమ బెంగాల్ (West Bengal)': {
    'కోల్‌కతా (Kolkata)': [
      'కోల్‌కతా సెంట్రల్ (Kolkata Central)',
      'సాల్ట్ లేక్ సిటీ (Salt Lake City - Bidhannagar)',
      'న్యూ టౌన్ (New Town - Rajarhat)',
      'సౌత్ కోల్‌కతా (South Kolkata)',
      'నార్త్ కోల్‌కతా (North Kolkata)',
      'జాదవ్‌పూర్ (Jadavpur)',
      'అలీపూర్ (Alipore)'
    ],
    'హౌరా (Howrah)': [
      'హౌరా సదర్ (Howrah Sadar)',
      'ఉలుబెరియా (Uluberia)',
      'బల్లి (Bally)',
      'ఆమ్తా (Amta)',
      'బగ్నాన్ (Bagnan)'
    ],
    'నార్త్ 24 పరగణాలు (North 24 Parganas - Barasat)': [
      'బరాసత్ (Barasat)',
      'బారక్‌పూర్ (Barrackpore)',
      'బిధాన్‌నగర్ (Bidhannagar)',
      'బంగావ్ (Bangaon)',
      'బసిర్‌హాట్ (Basirhat)'
    ],
    'డార్జిలింగ్ (Darjeeling)': [
      'డార్జిలింగ్ టౌన్ (Darjeeling Town)',
      'సిలిగురి (Siliguri)',
      'కుర్సియోంగ్ (Kurseong)',
      'మిరిక్ (Mirik)'
    ],
    'పశ్చిమ బర్ధమాన్ (Paschim Bardhaman - Asansol)': [
      'ఆసన్‌సోల్ (Asansol)',
      'దుర్గాపూర్ (Durgapur)',
      'రాణిగంజ్ (Raniganj)',
      'కుల్టి (Kulti)'
    ]
  },

  // 8 Union Territories from PDF Page 2
  'అండమాన్ & నికోబార్ దీవులు (Andaman and Nicobar Islands)': {
    'సౌత్ అండమాన్ (South Andaman - Port Blair)': [
      'పోర్ట్ బ్లెయిర్ అర్బన్ (Port Blair Urban)',
      'ఫెర్రార్‌గంజ్ (Ferrargunj)',
      'లిటిల్ అండమాన్ / హట్ బే (Little Andaman)'
    ],
    'నార్త్ & మిడిల్ అండమాన్ (North and Middle Andaman)': [
      'మాయాబందర్ (Mayabunder)',
      'దిగ్లీపూర్ (Diglipur)',
      'రంగట్ (Rangat)'
    ],
    'నికోబార్ (Nicobar)': [
      'కార్ నికోబార్ (Car Nicobar)',
      'నాన్‌కౌరి (Nancowry)',
      'గ్రేట్ నికోబార్ (Great Nicobar)'
    ]
  },
  'చండీగఢ్ (Chandigarh)': {
    'చండీగఢ్ అర్బన్ (Chandigarh Urban)': [
      'సెక్టార్ 1-17 (Sector 1 to 17)',
      'సెక్టార్ 18-35 (Sector 18 to 35)',
      'సెక్టార్ 36-60 (Sector 36 to 60)',
      'మణిమాజ్రా (Manimajra)',
      'ఇండస్ట్రియల్ ఏరియా (Industrial Area)'
    ]
  },
  'దాద్రా & నగర్ హవేలి మరియు డామన్ & డయ్యూ (Dadra & Nagar Haveli and Daman & Diu)': {
    'డామన్ (Daman)': [
      'నాని డామన్ (Nani Daman)',
      'మోతి డామన్ (Moti Daman)',
      'కడియా (Kadaiya)'
    ],
    'డయ్యూ (Diu)': [
      'డయ్యూ టౌన్ (Diu Town)',
      'వనక్‌బరా (Vanakbara)',
      'బుచర్వాడా (Bucharwada)'
    ],
    'దాద్రా & నగర్ హవేలి (Dadra & Nagar Haveli - Silvassa)': [
      'సిల్వస్సా (Silvassa)',
      'దాద్రా (Dadra)',
      'ఖనోవేల్ (Khanvel)',
      'రందోలి (Randha)'
    ]
  },
  'ఢిల్లీ (Delhi / New Delhi)': {
    'న్యూ ఢిల్లీ (New Delhi)': [
      'కన్నాట్ ప్లేస్ (Connaught Place)',
      'చాణక్యపురి (Chanakyapuri)',
      'ఇండియా గేట్ / పార్లమెంట్ సర్కిల్ (Parliament Circle)',
      'వసంత్ విహార్ (Vasant Vihar)',
      'ఢిల్లీ కంటోన్మెంట్ (Delhi Cantt)'
    ],
    'సౌత్ ఢిల్లీ (South Delhi)': [
      'సాకేత్ (Saket)',
      'హౌజ్ ఖాస్ (Hauz Khas)',
      'గ్రేటర్ కైలాష్ (Greater Kailash)',
      'లజ్‌పత్ నగర్ (Lajpat Nagar)',
      'మెహ్రౌలి (Mehrauli)'
    ],
    'సెంట్రల్ ఢిల్లీ (Central Delhi)': [
      'చాందినీ చౌక్ (Chandni Chowk)',
      'కరొల్ బాగ్ (Karol Bagh)',
      'దర్యాగంజ్ (Daryaganj)',
      'పహార్‌గంజ్ (Paharganj)'
    ],
    'వెస్ట్ ఢిల్లీ (West Delhi)': [
      'ద్వారకా (Dwarka)',
      'జనక్‌పురి (Janakpuri)',
      'రాజౌరీ గార్డెన్ (Rajouri Garden)',
      'పంజాబీ బాగ్ (Punjabi Bagh)',
      'తిలక్ నగర్ (Tilak Nagar)'
    ],
    'నార్త్ ఢిల్లీ (North Delhi)': [
      'రోహిణి (Rohini)',
      'సివిల్ లైన్స్ (Civil Lines)',
      'పిథంపుర (Pitampura)',
      'మోడల్ టౌన్ (Model Town)',
      'నరేలా (Narela)'
    ],
    'ఈస్ట్ ఢిల్లీ (East Delhi)': [
      'మయూర్ విహార్ (Mayur Vihar)',
      'లక్ష్మీ నగర్ (Laxmi Nagar)',
      'ప్రీత్ విహార్ (Preet Vihar)',
      'గాంధీ నగర్ (Gandhi Nagar)'
    ]
  },
  'జమ్మూ & కాశ్మీర్ (Jammu and Kashmir)': {
    'శ్రీనగర్ (Srinagar)': [
      'శ్రీనగర్ సెంట్రల్ (Srinagar Central)',
      'లాల్ చౌక్ (Lal Chowk)',
      'దాల్గేట్ (Dal Gate)',
      'ఖన్యాహర్ (Khanyar)',
      'హజ్రత్‌బల్ (Hazratbal)',
      'పాంథా చౌక్ (Pantha Chowk)'
    ],
    'జమ్మూ (Jammu)': [
      'జమ్మూ అర్బన్ (Jammu Urban)',
      'గాంధీ నగర్ (Gandhi Nagar)',
      'ఆర్.ఎస్. పుర (R.S. Pura)',
      'అఖ్నూర్ (Akhnoor)',
      'బాహు ఫోర్ట్ (Bahu Fort)'
    ],
    'అనంతనాగ్ (Anantnag)': [
      'అనంతనాగ్ టౌన్ (Anantnag Town)',
      'పహల్గామ్ (Pahalgam)',
      'బిజ్‌బెహరా (Bijbehara)',
      'కోకర్నాగ్ (Kokernag)'
    ],
    'బారాముల్లా (Baramulla)': [
      'బారాముల్లా టౌన్ (Baramulla Town)',
      'గుల్మార్గ్ / తాంగ్‌మార్గ్ (Gulmarg)',
      'సోపోర్ (Sopore)',
      'పట్టాన్ (Pattan)'
    ]
  },
  'లడఖ్ (Ladakh)': {
    'లేహ్ (Leh)': [
      'లేహ్ టౌన్ (Leh Town)',
      'నుబ్రా వ్యాలీ (Nubra Valley - Diskit)',
      'ఖల్ట్సే (Khaltse)',
      'చోగ్లామ్‌సర్ (Choglamsar)',
      'న్యోమా (Nyoma)'
    ],
    'కార్గిల్ (Kargil)': [
      'కార్గిల్ టౌన్ (Kargil Town)',
      'ద్రాస్ (Dras)',
      'జంస్కార్ (Zanskar - Padum)',
      'శంఖూ (Sankoo)'
    ]
  },
  'లక్షద్వీప్ (Lakshadweep)': {
    'లక్షద్వీప్ కేంద్ర పాలిత ప్రాంతం (Lakshadweep)': [
      'కవరట్టి (Kavaratti - Capital)',
      'అగత్తి (Agatti)',
      'అమినీ (Amini)',
      'ఆండ్రోత్ (Andrott)',
      'మినికాయ్ (Minicoy)',
      'కల్పేని (Kalpeni)',
      'కద్మత్ (Kadmat)'
    ]
  },
  'పుదుచ్చేరి (Puducherry)': {
    'పుదుచ్చేరి (Puducherry)': [
      'పాండిచ్చేరి అర్బన్ (Pondicherry Urban)',
      'ఔరోవిల్లే ప్రాంతం (Auroville Region)',
      'ఉళవార్కరై (Oulgaret)',
      'విల్లియానూరు (Villianur)',
      'బహూర్ (Bahour)'
    ],
    'యానాం (Yanam - AP Region)': [
      'యానాం టౌన్ (Yanam Town)',
      'ఫ్రాన్స్‌తిప్ప (Francetippa)',
      'ఆదివిపోలం (Adivipolam)',
      'కనకాలపేట (Kanakalapeta)'
    ],
    'కారైకాల్ (Karaikal)': [
      'కారైకాల్ టౌన్ (Karaikal Town)',
      'తిరునల్లారు (Thirunallar)',
      'నెడుంగడు (Nedungadu)'
    ],
    'మాహే (Mahe)': [
      'మాహే టౌన్ (Mahe Town)',
      'చోక్కర (Chokkara)'
    ]
  }
};

// Complete Unified Map containing ALL 28 States and 8 Union Territories
export const INDIA_LOCATIONS: LocationHierarchy = {
  'ఆంధ్రప్రదేశ్ (Andhra Pradesh)': AP_26_DISTRICTS,
  'తెలంగాణ (Telangana)': TELANGANA_33_DISTRICTS,
  ...NATIONAL_STATES_AND_UTS
};

export const DEFAULT_STATE = 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)';
export const DEFAULT_DISTRICT = 'కృష్ణా (Krishna)';
export const DEFAULT_MANDAL = 'విజయవాడ అర్బన్ (Vijayawada Urban)';

export function getAllStates(): string[] {
  return Object.keys(INDIA_LOCATIONS);
}

export function getDistrictsForState(state: string): string[] {
  if (!state) return [];
  // Direct match or partial match
  if (INDIA_LOCATIONS[state]) {
    return Object.keys(INDIA_LOCATIONS[state]);
  }
  const matchedKey = Object.keys(INDIA_LOCATIONS).find(
    (k) => k.includes(state) || state.includes(k)
  );
  if (matchedKey) {
    return Object.keys(INDIA_LOCATIONS[matchedKey]);
  }
  return [];
}

export function getMandalsForDistrict(state: string, district: string): string[] {
  if (!state || !district) return [];
  let stateMap = INDIA_LOCATIONS[state];
  if (!stateMap) {
    const matchedStateKey = Object.keys(INDIA_LOCATIONS).find(
      (k) => k.includes(state) || state.includes(k)
    );
    if (matchedStateKey) stateMap = INDIA_LOCATIONS[matchedStateKey];
  }

  if (!stateMap) return [];

  if (stateMap[district]) {
    return stateMap[district];
  }

  const matchedDistKey = Object.keys(stateMap).find(
    (k) => k.includes(district) || district.includes(k)
  );
  if (matchedDistKey) {
    return stateMap[matchedDistKey];
  }

  return [];
}
