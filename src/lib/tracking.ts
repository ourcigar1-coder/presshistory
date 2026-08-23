import posthog from 'posthog-js';

/**
 * Knowledge Tracking Utility
 * 
 * Exploration Depth: 익명 세션에서 방문한 고유 Knowledge Node 수
 */

type NodeType = 'entry' | 'technique' | 'artwork' | 'story' | 'term' | 'science' | 'bridge';
interface KnowledgeNode {
  id: string;
  type: NodeType;
  title: string;
  slug: string;
}

interface TrackingSession {
  nodeId: string;
  timestamp: number;
  type: NodeType;
  title: string;
  slug: string;
}

const SESSION_STORAGE_KEY = 'presshistory_tracking_session';
const VISITED_NODES_KEY = 'presshistory_visited_nodes';
const isBrowser = typeof window !== 'undefined';

function capture(event: string, properties: Record<string, unknown>): void {
  if (isBrowser && posthog.__loaded) posthog.capture(event, properties);
}

// Get unique visitor ID (anonymous)
function getVisitorId(): string {
  if (!isBrowser) return 'server';

  let id = localStorage.getItem('presshistory_visitor_id');
  if (!id) {
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('presshistory_visitor_id', id);
  }
  return id;
}

// Get or create tracking session
export function getTrackingSession(): TrackingSession | null {
  if (!isBrowser) return null;

  const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (session) {
    return JSON.parse(session);
  }
  return null;
}

// Record node view
export function trackNodeView(node: KnowledgeNode): void {
  if (!isBrowser) return;

  // Update current session
  const session: TrackingSession = {
    nodeId: node.id,
    timestamp: Date.now(),
    type: node.type,
    title: node.title,
    slug: node.slug,
  };
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

  // Track visited nodes
  const visited = getVisitedNodes();
  if (!visited.includes(node.id)) {
    visited.push(node.id);
    localStorage.setItem(VISITED_NODES_KEY, JSON.stringify(visited));
  }

  capture('knowledge_node_view', {
    node_id: node.id,
    node_type: node.type,
    title: node.title,
    slug: node.slug,
    exploration_depth: visited.length,
  });
}

// Get exploration depth (number of unique nodes visited)
export function getExplorationDepth(): number {
  const visited = getVisitedNodes();
  return visited.length;
}

// Get visited nodes
export function getVisitedNodes(): string[] {
  if (!isBrowser) return [];

  const visited = localStorage.getItem(VISITED_NODES_KEY);
  if (visited) {
    try {
      return JSON.parse(visited);
    } catch {
      return [];
    }
  }
  return [];
}

// Record entry start
export function trackEntryStart(entryType: 'time-journey' | 'object-journey'): void {
  const event = {
    type: 'entry_start' as const,
    entryType,
    timestamp: Date.now(),
    visitorId: getVisitorId(),
  };
  console.log('[Tracking] Entry Start:', event);
  capture('entry_path_start', event);
}

// Record entry step
export function trackEntryStep(entryType: 'time-journey' | 'object-journey', stepIndex: number): void {
  const event = {
    type: 'entry_step' as const,
    entryType,
    stepIndex,
    timestamp: Date.now(),
    visitorId: getVisitorId(),
  };
  console.log('[Tracking] Entry Step:', event);
  capture('entry_path_step', event);
}

// Record search
export function trackSearch(query: string): void {
  const event = {
    type: 'search' as const,
    query,
    timestamp: Date.now(),
    visitorId: getVisitorId(),
  };
  console.log('[Tracking] Search:', event);
  capture('search_performed', event);
}

// Record related content click
export function trackRelatedClick(sourceNode: KnowledgeNode, targetNode: KnowledgeNode): void {
  const event = {
    type: 'related_click' as const,
    source: sourceNode,
    target: targetNode,
    timestamp: Date.now(),
    visitorId: getVisitorId(),
  };
  console.log('[Tracking] Related Click:', event);
  capture('related_content_click', event);
}

// Clear session (when user closes browser)
export function clearTrackingSession(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
