import { create } from 'zustand';

export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

export interface FeedbackAction {
  /** i18n key for the button label, resolved by the component via t() */
  labelKey: string;
  onPress: () => void;
}

export interface FeedbackItem {
  id: number;
  /** bumps on every show() that lands on this item — used to reset the timer */
  revision: number;
  type: FeedbackType;
  /** i18n key — the component resolves it with t(messageKey, params) */
  messageKey: string;
  /** interpolation params passed straight to t() */
  params?: Record<string, string | number>;
  /** optional inline action button (e.g. "Undo") */
  action?: FeedbackAction;
  /** auto-hide delay in ms; 0 keeps the toast until it is dismissed manually */
  duration: number;
  /** how many identical shows collapsed into this toast (>= 1) */
  count: number;
}

export interface ShowFeedbackInput {
  type: FeedbackType;
  messageKey: string;
  params?: Record<string, string | number>;
  action?: FeedbackAction;
  duration?: number;
}

interface FeedbackStore {
  /** the single toast currently on screen (newest wins) */
  current: FeedbackItem | null;
  show: (input: ShowFeedbackInput) => number;
  dismiss: (id: number) => void;
  clear: () => void;
}

const DEFAULT_DURATION = 2500;

/** two shows with the same signature collapse into one toast + a counter */
const signatureOf = (input: {
  type: FeedbackType;
  messageKey: string;
  params?: Record<string, string | number>;
}) =>
  `${input.type}|${input.messageKey}|${
    input.params ? JSON.stringify(input.params) : ''
  }`;

let nextId = 0;

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
  current: null,
  show: input => {
    const prev = get().current;

    // Same message fired again while still visible → don't stack, just bump
    // the counter and reset the auto-hide timer (revision change).
    if (prev && signatureOf(prev) === signatureOf(input)) {
      set({
        current: {
          ...prev,
          revision: prev.revision + 1,
          count: prev.count + 1,
          action: input.action ?? prev.action,
          duration: input.duration ?? prev.duration,
        },
      });
      return prev.id;
    }

    // Different message → replace the current toast immediately (no backlog).
    const id = (nextId += 1);
    set({
      current: {
        id,
        revision: 0,
        type: input.type,
        messageKey: input.messageKey,
        params: input.params,
        action: input.action,
        duration: input.duration ?? DEFAULT_DURATION,
        count: 1,
      },
    });
    return id;
  },
  dismiss: id =>
    set(state => (state.current?.id === id ? { current: null } : state)),
  clear: () => set({ current: null }),
}));
