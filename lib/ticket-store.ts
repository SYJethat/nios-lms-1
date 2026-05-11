import { useSyncExternalStore } from 'react';

export type TicketPriority = 'Low' | 'Medium' | 'High';
export type TicketStatus = 'open' | 'escalated' | 'resolved';
export type TicketRole = 'Learner' | 'Teacher' | 'Parent' | 'Admin';

export type Ticket = {
  id: string;
  createdAt: string;
  topic: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  sla: string;
  reportedByName: string;
  reportedByRole: TicketRole;
};

type Listener = () => void;

const listeners = new Set<Listener>();

// In-memory mock store shared across pages (client-side)
let tickets: Ticket[] = [
  {
    id: 'TKT-1001',
    createdAt: new Date().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    topic: 'AI Tutor Recap',
    description: 'I need a recap of Introduction to Vrikshayurveda in 10 bullet points.',
    priority: 'Low',
    status: 'resolved',
    sla: '—',
    reportedByName: 'Learner',
    reportedByRole: 'Learner',
  },
  {
    id: 'TKT-1002',
    createdAt: new Date().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    topic: 'Live Class Access',
    description: 'Unable to join the live class link after login.',
    priority: 'High',
    status: 'escalated',
    sla: '14m left',
    reportedByName: 'Learner',
    reportedByRole: 'Learner',
  },
];

function emitChange() {
  for (const l of listeners) l();
}

export function addTicket(partial: Omit<Ticket, 'id' | 'createdAt'> & { id?: string; createdAt?: string }) {
  const id = partial.id ?? `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
  const createdAt =
    partial.createdAt ??
    new Date().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

  const ticket: Ticket = {
    id,
    createdAt,
    topic: partial.topic,
    description: partial.description,
    priority: partial.priority,
    status: partial.status,
    sla: partial.sla,
    reportedByName: partial.reportedByName,
    reportedByRole: partial.reportedByRole,
  };

  tickets = [ticket, ...tickets];
  emitChange();
  return ticket;
}

export function getTickets() {
  return tickets;
}

export function subscribeTickets(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTickets() {
  const snapshot = () => tickets;
  const getServerSnapshot = () => tickets;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useSyncExternalStore(subscribeTickets, snapshot, getServerSnapshot);
  return state;
}

