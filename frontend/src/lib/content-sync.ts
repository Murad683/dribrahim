const CONTENT_SYNC_KEY = 'dribrahim-public-content-sync';
const CONTENT_SYNC_EVENT = 'dribrahim:content-sync';

export type ContentScope = 'services' | 'cases' | 'profile' | 'all';

type ContentPayload = {
  scope: ContentScope;
  timestamp: number;
};

const parsePayload = (value: string | null): ContentPayload | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as ContentPayload;
  } catch {
    return null;
  }
};

export const notifyPublicDataChanged = (scope: ContentScope) => {
  const payload: ContentPayload = {
    scope,
    timestamp: Date.now(),
  };

  localStorage.setItem(CONTENT_SYNC_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent<ContentPayload>(CONTENT_SYNC_EVENT, { detail: payload }));
};

export const subscribeToContentChanges = (
  scope: ContentScope,
  callback: () => void,
) => {
  const shouldNotify = (payload: ContentPayload | null) =>
    payload && (payload.scope === scope || payload.scope === 'all' || scope === 'all');

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== CONTENT_SYNC_KEY) {
      return;
    }

    if (shouldNotify(parsePayload(event.newValue))) {
      callback();
    }
  };

  const handleCustom = (event: Event) => {
    const customEvent = event as CustomEvent<ContentPayload>;

    if (shouldNotify(customEvent.detail)) {
      callback();
    }
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(CONTENT_SYNC_EVENT, handleCustom);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(CONTENT_SYNC_EVENT, handleCustom);
  };
};
