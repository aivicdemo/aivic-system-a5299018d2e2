export interface FeatureUsagePattern {
  pattern: string;
  frequency: number;
}

export interface SubmissionStatus {
  all_submitted: boolean;
  submitted_count: number;
  absent_members: Array<{ user_id: string; user_name: string; department_id: string }>;
  delayed_members: Array<{ user_id: string; user_name: string; department_id: string }>;
  total_members: number;
}

export interface EmailMessage {
  subject: string;
  body: string;
}

export interface SentMessage {
  message_id: string;
  recipient: string;
  sent_timestamp: Date;
  status: string;
}

export interface AuditEvent {
  event_id: string;
  event_type: string;
  timestamp: Date;
  execution_details: {
    check_time: string;
    meeting_start_time: string;
    department_id: string;
    submitted_reports_count: number;
    unsubmitted_members_count: number;
    delayed_members_count: number;
    notification_sent: boolean;
    notification_recipient: string;
  };
}

export interface DailyReport {
  yesterday_achievement: string;
  today_plan: string;
  current_issues: string;
}

export interface PromptionResult {
  success: boolean;
  message_id: string;
}

export interface MessageLog {
  id: string;
  sent_at: string;
  status: string;
}

export interface EscalationAnalysis {
  escalation_condition: string;
  missing_users: Array<{ user_id: string; user_name: string; department_id: string }>;
  repeated_missing_user: {
    user_id: string;
    user_name: string;
    department_id: string;
    missing_count: number;
    recent_missing_dates: string[];
  };
  ai_recommendation: string;
  ai_confidence: string;
}

export interface PromptionContext {
  submissionStatus: SubmissionStatus;
  unsubmittedMembers: Array<{ user_id: string; user_name: string; department_id: string }>;
  delayedMembers: Array<{ user_id: string; user_name: string; department_id: string }>;
  submissionDeadline: string;
  managerEmail: string;
}

export interface PromptionAction {
  action: string;
  result: string;
}

export function analyzeFeatureUsagePattern(usageData: Record<string, number>): FeatureUsagePattern {
  if (!usageData || typeof usageData !== 'object') {
    return { pattern: 'unknown', frequency: 0 };
  }
  
  const entries = Object.entries(usageData).filter(
    ([_, v]: [string, any]) => typeof v === 'number' && v > 0
  );
  
  if (entries.length === 0) {
    return { pattern: 'unknown', frequency: 0 };
  }
  
  const maxEntry = entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max));
  
  return { pattern: maxEntry[0], frequency: maxEntry[1] };
}

export function identifyReportingStatus(data: SubmissionStatus): SubmissionStatus {
  if (!data || typeof data !== 'object') {
    return {
      all_submitted: false,
      submitted_count: 0,
      absent_members: [],
      delayed_members: [],
      total_members: 0,
    };
  }

  const submitted_count = (data as any).submitted_count ?? 0;
  const total_members = (data as any).total_members ?? 0;
  const absent_members = Array.isArray((data as any).absent_members) ? (data as any).absent_members : [];
  const delayed_members = Array.isArray((data as any).delayed_members) ? (data as any).delayed_members : [];

  return {
    all_submitted: submitted_count === total_members && delayed_members.length === 0,
    submitted_count,
    absent_members,
    delayed_members,
    total_members,
  };
}

export function executePromptionLoop(data: AuditEvent): AuditEvent {
  if (!data || typeof data !== 'object') {
    return {
      event_id: '',
      event_type: 'promption_loop',
      timestamp: new Date(),
      execution_details: {
        check_time: '',
        meeting_start_time: '',
        department_id: '',
        submitted_reports_count: 0,
        unsubmitted_members_count: 0,
        delayed_members_count: 0,
        notification_sent: false,
        notification_recipient: '',
      },
    };
  }

  const typedData = data as any;
  return {
    event_id: typedData.event_id ?? '',
    event_type: typedData.event_type ?? 'promption_loop',
    timestamp: typedData.timestamp instanceof Date ? typedData.timestamp : new Date(),
    execution_details: typedData.execution_details ?? {
      check_time: '',
      meeting_start_time: '',
      department_id: '',
      submitted_reports_count: 0,
      unsubmitted_members_count: 0,
      delayed_members_count: 0,
      notification_sent: false,
      notification_recipient: '',
    },
  };
}

export function formatReportListWithPagination(data: DailyReport): DailyReport {
  if (!data || typeof data !== 'object') {
    return {
      yesterday_achievement: '',
      today_plan: '',
      current_issues: '',
    };
  }

  const typedData = data as any;
  return {
    yesterday_achievement: typedData.yesterday_achievement ?? '',
    today_plan: typedData.today_plan ?? '',
    current_issues: typedData.current_issues ?? '',
  };
}

export function sendPromptionEmailToDepartmentHead(message: EmailMessage): PromptionResult {
  if (!message || typeof message !== 'object') {
    return {
      success: false,
      message_id: '',
    };
  }

  return {
    success: true,
    message_id: `msg_${Date.now()}`,
  };
}

export function logSentMessage(data: MessageLog): MessageLog {
  if (!data || typeof data !== 'object') {
    return {
      id: '',
      sent_at: '',
      status: 'unknown',
    };
  }

  const typedData = data as any;
  return {
    id: typedData.id ?? '',
    sent_at: typedData.sent_at ?? new Date().toISOString(),
    status: typedData.status ?? 'pending',
  };
}

export function analyzeEscalationCondition(data: EscalationAnalysis): EscalationAnalysis {
  if (!data || typeof data !== 'object') {
    return {
      escalation_condition: 'unknown',
      missing_users: [],
      repeated_missing_user: {
        user_id: '',
        user_name: '',
        department_id: '',
        missing_count: 0,
        recent_missing_dates: [],
      },
      ai_recommendation: '',
      ai_confidence: '',
    };
  }

  const typedData = data as any;
  return {
    escalation_condition: typedData.escalation_condition ?? 'unknown',
    missing_users: Array.isArray(typedData.missing_users) ? typedData.missing_users : [],
    repeated_missing_user: typedData.repeated_missing_user ?? {
      user_id: '',
      user_name: '',
      department_id: '',
      missing_count: 0,
      recent_missing_dates: [],
    },
    ai_recommendation: typedData.ai_recommendation ?? '',
    ai_confidence: typedData.ai_confidence ?? '',
  };
}

export function buildPromptionContext(data: PromptionContext): PromptionContext {
  const typedData = data as any;
  return {
    submissionStatus: typedData.submissionStatus,
    unsubmittedMembers: typedData.unsubmittedMembers,
    delayedMembers: typedData.delayedMembers,
    submissionDeadline: typedData.submissionDeadline,
    managerEmail: typedData.managerEmail,
  };
}

export function executePromptionAction(data: PromptionAction): PromptionAction {
  if (!data || typeof data !== 'object') {
    return {
      action: '',
      result: '',
    };
  }

  const typedData = data as any;
  return {
    action: typedData.action ?? '',
    result: typedData.result ?? '',
  };
}