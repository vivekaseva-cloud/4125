import test from 'node:test';
import assert from 'node:assert/strict';
import {
  incrementViewCount,
  filterArticles,
  validateReporterRegistration,
  validatePrivateAd,
  extractYouTubeVideoId,
  formatViewCount,
  filterActiveAds,
} from './newsLogic';
import { NewsArticle, PrivateAd } from './types';

const sampleArticles: NewsArticle[] = [
  {
    id: 'art-1',
    title: { te: 'విజయవాడలో ఆధునిక ఫ్లైఓవర్ ప్రారంభం', en: 'Modern Flyover Inaugurated in Vijayawada', hi: 'विजयवाड़ा में नए फ्लाईओवर का उद्घाटन' },
    summary: { te: 'నగర ట్రాఫిక్ సమస్యలకు శాశ్వత పరిష్కారం', en: 'Permanent relief from urban traffic congestion', hi: 'ट्रैफिक जाम से मिलेगी मुक्ति' },
    content: { te: 'వివరాలు...', en: 'Details...', hi: 'विवरण...' },
    category: 'mandal',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'కృష్ణా (Krishna)',
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
    imageUrl: 'https://picsum.photos/seed/flyover/800/500',
    views: 120,
    publishedAt: '2026-11-01T10:00:00Z',
    authorName: 'రాము (Ramu)',
    authorRole: 'Reporter',
    status: 'published',
  },
  {
    id: 'art-2',
    title: { te: 'భారత అంతరిక్ష పరిశోధనలో సరికొత్త మైలురాయి', en: 'New Milestone in Indian Space Mission', hi: 'भारतीय अंतरिक्ष अनुसंधान में नया इतिहास' },
    summary: { te: 'ఇస్రో కొత్త రాకెట్ విజయవంతం', en: 'ISRO successfully tests advanced rocket', hi: 'इसरो का सफल परीक्षण' },
    content: { te: 'వివరాలు...', en: 'Details...', hi: 'विवरण...' },
    category: 'national',
    state: 'అఖిల భారతం (All India)',
    district: 'ఆల్ ఇండియా',
    mandal: 'ఆల్ ఇండియా',
    imageUrl: 'https://picsum.photos/seed/space/800/500',
    views: 5400,
    publishedAt: '2026-11-01T08:00:00Z',
    authorName: 'ఎడిటర్ (Editor)',
    authorRole: 'Admin',
    status: 'published',
  },
  {
    id: 'art-3',
    title: { te: 'హైదరాబాద్ ఐటీ కారిడార్‌లో ట్రాఫిక్ డైవర్షన్', en: 'Traffic Diversion in Hyderabad IT Corridor', hi: 'हैदराबाद में ट्रैफिक डाइवर्जन' },
    summary: { te: 'శేరిలింగంపల్లి పరిసరాల్లో మార్పులు', en: 'Diversions near Serilingampally', hi: 'विवरण' },
    content: { te: 'వివరాలు...', en: 'Details...', hi: 'विवरण...' },
    category: 'mandal',
    state: 'తెలంగాణ (Telangana)',
    district: 'రంగారెడ్డి (Rangareddy)',
    mandal: 'శేరిలింగంపల్లి (Serilingampally)',
    imageUrl: 'https://picsum.photos/seed/traffic/800/500',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    views: 890,
    publishedAt: '2026-11-01T09:30:00Z',
    authorName: 'సురేష్ (Suresh)',
    authorRole: 'Reporter',
    status: 'published',
  },
  {
    id: 'art-draft',
    title: { te: 'డ్రాఫ్ట్ వార్త', en: 'Draft Article', hi: 'ड्राफ्ट' },
    summary: { te: 'ఇంకా ఆమోదించబడలేదు', en: 'Not yet approved', hi: 'लंबित' },
    content: { te: 'వివరాలు...', en: 'Details...', hi: 'विवरण...' },
    category: 'politics',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'కృష్ణా (Krishna)',
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
    imageUrl: '',
    views: 0,
    publishedAt: '2026-11-01T11:00:00Z',
    authorName: 'కొత్త రిపోర్టర్',
    authorRole: 'Reporter',
    status: 'pending',
  },
];

test('incrementViewCount correctly increments views for specified article', () => {
  const updated = incrementViewCount(sampleArticles, 'art-1');
  const target = updated.find((a) => a.id === 'art-1');
  assert.equal(target?.views, 121);

  // Original array remains intact (immutability)
  assert.equal(sampleArticles[0].views, 120);
});

test('filterArticles excludes pending/draft articles', () => {
  const filtered = filterArticles(sampleArticles, {});
  assert.equal(filtered.length, 3);
  assert.equal(filtered.some((a) => a.id === 'art-draft'), false);
});

test('filterArticles filters by mandal correctly', () => {
  const mandalFiltered = filterArticles(sampleArticles, {
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
  });
  assert.equal(mandalFiltered.length, 1);
  assert.equal(mandalFiltered[0].id, 'art-1');
});

test('filterArticles filters by video category', () => {
  const videoFiltered = filterArticles(sampleArticles, {
    category: 'video',
  });
  assert.equal(videoFiltered.length, 1);
  assert.equal(videoFiltered[0].id, 'art-3');
});

test('filterArticles searches by keyword in Telugu and English', () => {
  const teSearch = filterArticles(sampleArticles, {
    searchQuery: 'ఫ్లైఓవర్',
    lang: 'te',
  });
  assert.equal(teSearch.length, 1);
  assert.equal(teSearch[0].id, 'art-1');

  const enSearch = filterArticles(sampleArticles, {
    searchQuery: 'Milestone',
    lang: 'en',
  });
  assert.equal(enSearch.length, 1);
  assert.equal(enSearch[0].id, 'art-2');
});

test('validateReporterRegistration checks 10 digit mobile and 12 digit aadhaar', () => {
  const invalid = validateReporterRegistration({
    fullName: 'రాము',
    mobile: '123',
    username: 'ram',
    password: '123',
    state: 'all',
    district: 'all',
    mandal: 'all',
    aadhaarNumber: '12345',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.length >= 4);

  const valid = validateReporterRegistration({
    fullName: 'రామకృష్ణ శర్మ',
    mobile: '9848022338',
    username: 'ramakrishna',
    password: 'SecurePass123!',
    state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
    district: 'కృష్ణా (Krishna)',
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
    aadhaarNumber: '1234 5678 9012',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.errors.length, 0);
});

test('extractYouTubeVideoId parses different YouTube URL styles', () => {
  assert.equal(
    extractYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    'dQw4w9WgXcQ'
  );
  assert.equal(
    extractYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ'),
    'dQw4w9WgXcQ'
  );
  assert.equal(
    extractYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ'),
    'dQw4w9WgXcQ'
  );
  assert.equal(extractYouTubeVideoId(''), null);
});

test('formatViewCount formats numbers nicely', () => {
  assert.equal(formatViewCount(500), '500');
  assert.equal(formatViewCount(1500), '1.5K');
  assert.equal(formatViewCount(2300000), '2.3M');
});

test('filterActiveAds returns only approved ads for matching mandal/district', () => {
  const ads: PrivateAd[] = [
    {
      id: 'ad-1',
      title: 'ప్లాట్లు అమ్మబడును - విజయవాడ హైవే',
      category: 'real_estate',
      state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
      district: 'కృష్ణా (Krishna)',
      mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
      bannerUrl: 'https://picsum.photos/seed/ad1/400/250',
      advertiserName: 'శ్రీ బాలాజీ రియల్టర్స్',
      contactPhone: '9848011223',
      contactWhatsApp: '9848011223',
      description: 'వెంచర్ ప్రారంభం',
      validTill: '2027-12-31',
      status: 'approved',
      submittedAt: '2026-11-01',
    },
    {
      id: 'ad-pending',
      title: 'షాప్ రెంట్‌కు',
      category: 'business',
      state: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
      district: 'కృష్ణా (Krishna)',
      mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
      bannerUrl: '',
      advertiserName: 'లక్ష్మి',
      contactPhone: '9848099887',
      contactWhatsApp: '9848099887',
      description: 'ఖాళీ ఉంది',
      validTill: '2027-12-31',
      status: 'pending',
      submittedAt: '2026-11-01',
    },
  ];

  const approved = filterActiveAds(ads, {
    mandal: 'విజయవాడ అర్బన్ (Vijayawada Urban)',
  });
  assert.equal(approved.length, 1);
  assert.equal(approved[0].id, 'ad-1');
});

test('ALL_INDIA_STATES_INFO contains 28 states and ALL_INDIA_UNION_TERRITORIES_INFO contains 8 UTs', async () => {
  const { ALL_INDIA_STATES_INFO, ALL_INDIA_UNION_TERRITORIES_INFO, getAllStates, getDistrictsForState, getMandalsForDistrict } = await import('./indiaData');
  
  assert.equal(ALL_INDIA_STATES_INFO.length, 28);
  assert.equal(ALL_INDIA_UNION_TERRITORIES_INFO.length, 8);

  const allStates = getAllStates();
  // 28 states + 8 UTs = 36 total entries
  assert.ok(allStates.length >= 36);

  // Test Bihar
  const biharDistricts = getDistrictsForState('బీహార్ (Bihar)');
  assert.ok(biharDistricts.length >= 5);
  const patnaMandals = getMandalsForDistrict('బీహార్ (Bihar)', biharDistricts[0]);
  assert.ok(patnaMandals.length >= 3);

  // Test Delhi
  const delhiDistricts = getDistrictsForState('ఢిల్లీ (Delhi / New Delhi)');
  assert.ok(delhiDistricts.length >= 4);

  // Test Assam
  const assamDistricts = getDistrictsForState('అస్సాం (Assam)');
  assert.ok(assamDistricts.length >= 4);
});

test('searchArticlesGlobal searches across title, content, and reporter name', async () => {
  const { searchArticlesGlobal } = await import('./newsLogic');
  const { INITIAL_ARTICLES } = await import('./storage');

  // 1. Search by title
  const titleSearch = searchArticlesGlobal(INITIAL_ARTICLES, 'ఇస్రో', 'te');
  assert.ok(titleSearch.length >= 1);
  assert.equal(titleSearch[0].matchType, 'title');

  // 2. Search by reporter name
  const reporterSearch = searchArticlesGlobal(INITIAL_ARTICLES, 'సురేష్', 'te');
  assert.ok(reporterSearch.length >= 1);
  assert.ok(reporterSearch.some((r) => r.matchType === 'reporter'));

  // 3. Search by content keyword
  const contentSearch = searchArticlesGlobal(INITIAL_ARTICLES, 'రైతు', 'te');
  assert.ok(contentSearch.length >= 1);

  // 4. Case-insensitive English search
  const enSearch = searchArticlesGlobal(INITIAL_ARTICLES, 'ISRO', 'en');
  assert.ok(enSearch.length >= 1);
  assert.equal(enSearch[0].matchType, 'title');
});

test('DEFAULT_LOGO_URL references official Tricolour News Logo', async () => {
  const { DEFAULT_LOGO_URL, INITIAL_BRANDING } = await import('./storage');
  assert.ok(DEFAULT_LOGO_URL.includes('Tricolour_News_Logo'));
  assert.equal(INITIAL_BRANDING.logoUrl, DEFAULT_LOGO_URL);
  assert.equal(INITIAL_BRANDING.siteName, 'నేటి భారతం');
});

test('Admin credentials and password change verification flow', async () => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = await import('./storage');
  assert.equal(ADMIN_USERNAME, 'Admin');
  assert.equal(ADMIN_PASSWORD, 'Bchakriraju1992@');

  // Verify password strength criteria
  const isStrong = (pwd: string) => pwd.length >= 6;
  assert.equal(isStrong('123'), false);
  assert.equal(isStrong('NewSecurePass#2026'), true);
});

test('Updating article video link and title preserves views and id', () => {
  const original = sampleArticles[2]; // art-3 video article
  const updatedVideoUrl = 'https://youtu.be/NEW_VID_123';
  const updatedArticle: NewsArticle = {
    ...original,
    youtubeUrl: updatedVideoUrl,
    title: {
      ...original.title,
      te: 'సవరించబడిన వీడియో బులెటిన్ శీర్షిక',
    },
  };

  const updatedList = sampleArticles.map((a) => (a.id === updatedArticle.id ? updatedArticle : a));
  const found = updatedList.find((a) => a.id === 'art-3');
  assert.ok(found);
  assert.equal(found?.youtubeUrl, updatedVideoUrl);
  assert.equal(found?.title.te, 'సవరించబడిన వీడియో బులెటిన్ శీర్షిక');
  assert.equal(found?.views, original.views);
});
