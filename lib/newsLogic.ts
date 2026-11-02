import { NewsArticle, PrivateAd, Language } from './types';

export function incrementViewCount(articles: NewsArticle[], articleId: string): NewsArticle[] {
  return articles.map((item) => {
    if (item.id === articleId) {
      return {
        ...item,
        views: (item.views || 0) + 1,
      };
    }
    return item;
  });
}

export function filterArticles(
  articles: NewsArticle[],
  filters: {
    category?: string;
    state?: string;
    district?: string;
    mandal?: string;
    searchQuery?: string;
    lang?: Language;
  }
): NewsArticle[] {
  const { category, state, district, mandal, searchQuery, lang = 'te' } = filters;

  return articles.filter((article) => {
    // Only published/approved articles show to public
    if (article.status !== 'published') {
      return false;
    }

    // Category filter
    if (category && category !== 'all') {
      if (category === 'video') {
        if (!article.youtubeUrl) return false;
      } else if (article.category !== category) {
        return false;
      }
    }

    // State filter
    if (state && state !== 'all' && state !== 'అఖిల భారతం (All India)') {
      if (article.state && article.state !== state && article.state !== 'అఖిల భారతం (All India)') {
        return false;
      }
    }

    // District filter
    if (district && district !== 'all' && district !== 'అన్ని జిల్లాలు') {
      if (article.district && article.district !== district) {
        return false;
      }
    }

    // Mandal filter
    if (mandal && mandal !== 'all' && mandal !== 'అన్ని మండలాలు') {
      if (article.mandal && article.mandal !== mandal) {
        return false;
      }
    }

    // Search query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = (
        (article.title[lang] || '') +
        ' ' +
        (article.title.te || '') +
        ' ' +
        (article.title.en || '')
      ).toLowerCase().includes(q);

      const contentMatch = (
        (article.summary[lang] || '') +
        ' ' +
        (article.content[lang] || '')
      ).toLowerCase().includes(q);

      const locationMatch = (
        (article.mandal || '') +
        ' ' +
        (article.district || '') +
        ' ' +
        (article.state || '')
      ).toLowerCase().includes(q);

      const authorMatch = (article.authorName || '').toLowerCase().includes(q);

      if (!titleMatch && !contentMatch && !locationMatch && !authorMatch) {
        return false;
      }
    }

    return true;
  });
}

export interface SearchResultItem {
  article: NewsArticle;
  matchType: 'title' | 'reporter' | 'content';
  matchedSnippet: string;
}

export function searchArticlesGlobal(
  articles: NewsArticle[],
  query: string,
  lang: Language = 'te'
): SearchResultItem[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  const results: SearchResultItem[] = [];

  for (const article of articles) {
    if (article.status !== 'published') continue;

    // 1. Check title match (highest relevance)
    const titleTe = (article.title?.te || '').toLowerCase();
    const titleEn = (article.title?.en || '').toLowerCase();
    const titleHi = (article.title?.hi || '').toLowerCase();
    const currentTitle = (article.title?.[lang] || article.title?.te || '').toLowerCase();

    if (currentTitle.includes(q) || titleTe.includes(q) || titleEn.includes(q) || titleHi.includes(q)) {
      results.push({
        article,
        matchType: 'title',
        matchedSnippet: article.title[lang] || article.title.te,
      });
      continue;
    }

    // 2. Check reporter / author name match
    const authorName = (article.authorName || '').toLowerCase();
    if (authorName.includes(q)) {
      results.push({
        article,
        matchType: 'reporter',
        matchedSnippet: `రిపోర్టర్: ${article.authorName} (${article.mandal || article.district})`,
      });
      continue;
    }

    // 3. Check content / summary match
    const summaryText = (article.summary?.[lang] || article.summary?.te || '').toLowerCase();
    const contentText = (article.content?.[lang] || article.content?.te || '').toLowerCase();

    if (summaryText.includes(q) || contentText.includes(q)) {
      const source = article.summary?.[lang] || article.summary?.te || article.content?.[lang] || article.content?.te || '';
      const idx = source.toLowerCase().indexOf(q);
      const start = Math.max(0, idx - 30);
      const end = Math.min(source.length, idx + q.length + 50);
      const snippet = (start > 0 ? '...' : '') + source.substring(start, end).trim() + (end < source.length ? '...' : '');

      results.push({
        article,
        matchType: 'content',
        matchedSnippet: snippet,
      });
      continue;
    }
  }

  // Sort: title matches first, then reporter matches, then content matches
  return results.sort((a, b) => {
    const priority = { title: 1, reporter: 2, content: 3 };
    return priority[a.matchType] - priority[b.matchType];
  });
}

export function validateReporterRegistration(input: {
  fullName: string;
  mobile: string;
  username: string;
  password?: string;
  state: string;
  district: string;
  mandal: string;
  aadhaarNumber: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!input.fullName || input.fullName.trim().length < 3) {
    errors.push('పూర్తి పేరు కనీసం 3 అక్షరాలు ఉండాలి (Full name must be at least 3 characters)');
  }

  const cleanPhone = (input.mobile || '').replace(/[^0-9]/g, '');
  if (cleanPhone.length !== 10) {
    errors.push('చెల్లుబాటు అయ్యే 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి (Enter a valid 10-digit mobile number)');
  }

  if (!input.username || input.username.trim().length < 4) {
    errors.push('యూజర్ నేమ్ కనీసం 4 అక్షరాలు ఉండాలి (Username must be at least 4 characters)');
  }

  if (!input.password || input.password.length < 6) {
    errors.push('పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి (Password must be at least 6 characters)');
  }

  if (!input.state || input.state === 'all') {
    errors.push('రాష్ట్రాన్ని ఎంచుకోండి (Select a state)');
  }

  if (!input.district || input.district === 'all') {
    errors.push('జిల్లాను ఎంచుకోండి (Select a district)');
  }

  if (!input.mandal || input.mandal === 'all') {
    errors.push('మండలాన్ని ఎంచుకోండి (Select a mandal)');
  }

  const cleanAadhaar = (input.aadhaarNumber || '').replace(/[^0-9]/g, '');
  if (cleanAadhaar.length !== 12) {
    errors.push('చెల్లుబాటు అయ్యే 12 అంకెల ఆధార్ నంబర్ అవసరం (Valid 12-digit Aadhaar number required)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validatePrivateAd(input: {
  title: string;
  advertiserName: string;
  contactPhone: string;
  state: string;
  district: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length < 4) {
    errors.push('ప్రకటన శీర్షిక అవసరం (Ad title must be at least 4 characters)');
  }

  if (!input.advertiserName || input.advertiserName.trim().length < 2) {
    errors.push('ప్రకటనదారు పేరు అవసరం (Advertiser name required)');
  }

  const cleanPhone = (input.contactPhone || '').replace(/[^0-9]/g, '');
  if (cleanPhone.length < 10) {
    errors.push('సరైన సంప్రదింపు మొబైల్ నంబర్ ఇవ్వండి (Valid 10-digit contact number required)');
  }

  if (!input.state) {
    errors.push('రాష్ట్రాన్ని ఎంచుకోండి (State required)');
  }

  if (!input.district) {
    errors.push('జిల్లాను ఎంచుకోండి (District required)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function filterActiveAds(
  ads: PrivateAd[],
  location: { state?: string; district?: string; mandal?: string; category?: string }
): PrivateAd[] {
  return ads.filter((ad) => {
    if (ad.status !== 'approved') return false;

    if (location.category && location.category !== 'all' && ad.category !== location.category) {
      return false;
    }

    if (location.state && location.state !== 'all' && ad.state !== 'all') {
      if (ad.state !== location.state) return false;
    }

    if (location.district && location.district !== 'all' && ad.district !== 'all') {
      if (ad.district !== location.district) return false;
    }

    if (location.mandal && location.mandal !== 'all' && ad.mandal !== 'all') {
      if (ad.mandal !== location.mandal) return false;
    }

    return true;
  });
}

export function extractYouTubeVideoId(url: string | undefined): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function formatViewCount(views: number): string {
  if (!views || views <= 0) return '0';
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  }
  return views.toLocaleString('en-IN');
}
