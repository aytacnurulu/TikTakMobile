/**
 * Central catalog of feedback message keys.
 *
 * Call sites reference `FEEDBACK.ORDER.COMPLETED` instead of a raw string, so
 * every toast/modal message lives in one place and translation coverage can be
 * checked against the locale files. The values are i18n keys under the
 * `feedback.*` namespace in `shared/lib/i18n/locales/*.json`.
 */
export const FEEDBACK = {
  ORDER: {
    COMPLETED: 'feedback.order.completed',
    FAILED: 'feedback.order.failed',
  },
  BASKET: {
    ITEM_ADDED: 'feedback.basket.itemAdded',
    ITEM_REMOVED: 'feedback.basket.itemRemoved',
    UPDATE_FAILED: 'feedback.basket.updateFailed',
  },
  FAVORITES: {
    UPDATE_FAILED: 'feedback.favorites.updateFailed',
  },
  PROFILE: {
    SAVED: 'feedback.profile.saved',
    SAVE_FAILED: 'feedback.profile.saveFailed',
  },
  ADDRESS: {
    SAVED: 'feedback.address.saved',
    DELETED: 'feedback.address.deleted',
  },
  AUTH: {
    REGISTERED: 'feedback.auth.registered',
    SESSION_EXPIRED: 'feedback.auth.sessionExpired',
  },
  COMMON: {
    GENERIC_ERROR: 'feedback.common.genericError',
    COPIED: 'feedback.common.copied',
    OFFLINE: 'feedback.common.offline',
  },
} as const;

/** Reusable action-button labels for toast `action` / result-modal buttons. */
export const FEEDBACK_ACTION = {
  UNDO: 'feedback.action.undo',
  VIEW_ORDERS: 'feedback.action.viewOrders',
} as const;
