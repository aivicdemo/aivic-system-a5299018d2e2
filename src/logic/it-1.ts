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

export function analyzeFeatureUsagePattern(usageData: any): FeatureUsagePattern {
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

export function identifyReportingStatus(data: any): SubmissionStatus {
  if (!data || typeof data !== 'object') {
    return {
      all_submitted: false,
      submitted_count: 0,
      absent_members: [],
      delayed_members: [],
      total_members: 0,
    };
  }

  const submitted_count = data.submitted_count ?? 0;
  const total_members = data.total_members ?? 0;
  const absent_members = Array.isArray(data.absent_members) ? data.absent_members : [];
  const delayed_members = Array.isArray(data.delayed_members) ? data.delayed_members : [];

  return {
    all_submitted: submitted_count === total_members && delayed_members.length === 0,
    submitted_count,
    absent_members,
    delayed_members,
    total_members,
  };
}

export function executePromptionLoop(data: any): AuditEvent {
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

  return {
    event_id: data.event_id ?? '',
    event_type: data.event_type ?? 'promption_loop',
    timestamp: data.timestamp instanceof Date ? data.timestamp : new Date(),
    execution_details: data.execution_details ?? {
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

export function formatReportListWithPagination(data: any): DailyReport {
  if (!data || typeof data !== 'object') {
    return {
      yesterday_achievement: '',
      today_plan: '',
      current_issues: '',
    };
  }

  return {
    yesterday_achievement: data.yesterday_achievement ?? '',
    today_plan: data.today_plan ?? '',
    current_issues: data.current_issues ?? '',
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

export function logSentMessage(data: any): MessageLog {
  if (!data || typeof data !== 'object') {
    return {
      id: '',
      sent_at: '',
      status: 'unknown',
    };
  }

  return {
    id: data.id ?? '',
    sent_at: data.sent_at ?? new Date().toISOString(),
    status: data.status ?? 'pending',
  };
}

export function analyzeEscalationCondition(data: any): EscalationAnalysis {
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

  return {
    escalation_condition: data.escalation_condition ?? 'unknown',
    missing_users: Array.isArray(data.missing_users) ? data.missing_users : [],
    repeated_missing_user: data.repeated_missing_user ?? {
      user_id: '',
      user_name: '',
      department_id: '',
      missing_count: 0,
      recent_missing_dates: [],
    },
    ai_recommendation: data.ai_recommendation ?? '',
    ai_confidence: data.ai_confidence ?? '',
  };
}

export function buildPromptionContext(data: PromptionContext): PromptionContext {
  return {
    submissionStatus: data.submissionStatus,
    unsubmittedMembers: data.unsubmittedMembers,
    delayedMembers: data.delayedMembers,
    submissionDeadline: data.submissionDeadline,
    managerEmail: data.managerEmail,
  };
}

export function executePromptionAction(data: any): PromptionAction {
  if (!data || typeof data !== 'object') {
    return {
      action: '',
      result: '',
    };
  }

  return {
    action: data.action ?? '',
    result: data.result ?? '',
  };
}