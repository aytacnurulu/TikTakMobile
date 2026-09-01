import { useFeedbackStore } from '@/shared/store/feedback.store';
import type { FeedbackAction, FeedbackType } from '@/shared/store/feedback.store';

interface FeedbackOptions {
  params?: Record<string, string | number>;
  action?: FeedbackAction;
  /** ms; 0 keeps the toast until dismissed manually */
  duration?: number;
}

/**
 * Ergonomic wrapper over the feedback store for use inside components.
 *
 *   const feedback = useFeedback();
 *   feedback.success(FEEDBACK.PROFILE.SAVED);
 *   feedback.error(FEEDBACK.BASKET.UPDATE_FAILED);
 */
export const useFeedback = () => {
  const show = useFeedbackStore(state => state.show);
  const dismiss = useFeedbackStore(state => state.dismiss);

  return {
    success: (messageKey: string, opts?: FeedbackOptions) =>
      show({ type: 'success', messageKey, ...opts }),
    error: (messageKey: string, opts?: FeedbackOptions) =>
      show({ type: 'error', messageKey, ...opts }),
    info: (messageKey: string, opts?: FeedbackOptions) =>
      show({ type: 'info', messageKey, ...opts }),
    warning: (messageKey: string, opts?: FeedbackOptions) =>
      show({ type: 'warning', messageKey, ...opts }),
    dismiss,
  };
};

/**
 * Imperative helper for non-React call sites — TanStack Query
 * `onSuccess` / `onError`, the axios interceptor, etc.
 *
 *   showFeedback('success', FEEDBACK.PROFILE.SAVED);
 */
export const showFeedback = (
  type: FeedbackType,
  messageKey: string,
  opts?: FeedbackOptions,
) => useFeedbackStore.getState().show({ type, messageKey, ...opts });
