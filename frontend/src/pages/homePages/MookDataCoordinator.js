export const mockData = {
    userName: "Sarah",
    tasksData: [
      {
        key: '1',
        caseId: '#12543',
        clientName: 'Vertex Innovations',
        status: 'Pending Documents',
        lastUpdated: '2025-06-25',
      },
      {
        key: '2',
        caseId: '#67890',
        clientName: 'Nexa Solutions',
        status: 'In Review',
        lastUpdated: '2025-06-24',
      },
      {
        key: '3',
        caseId: '11223',
        clientName: 'Pinnacle Corp',
        status: 'Approved',
        lastUpdated: '2025-06-23',
      },
      {
        key: '4',
        caseId: '#44556',
        clientName: 'Aurora Enterprises',
        status: 'Pending Documents',
        lastUpdated: '2025-06-22',
      },
      {
        key: '5',
        caseId: '#77889',
        clientName: 'Summit Tech',
        status: 'In Review',
        lastUpdated: '2025-06-21',
      },
    ],
    clientInteractionsData: [
      {
        name: 'Vertex Innovations',
        lastMessage: 'Hi Sarah, can you confirm receipt of the latest docs?',
        avatar: null,
      },
      {
        name: 'Nexa Solutions',
        lastMessage: 'Looking forward to your feedback on the review.',
        avatar: null,
      },
      {
        name: 'Pinnacle Corp',
        lastMessage: 'Thanks for the approval update!',
        avatar: null,
      },
    ],
    documentPendencyData: [
      {
        key: '1',
        caseId: '#12543',
        clientName: 'Vertex Innovations',
        documentType: 'Financial Statements',
        dueDate: '2025-07-01',
      },
      {
        key: '2',
        caseId: '#44556',
        clientName: 'Aurora Enterprises',
        documentType: 'Business Plan',
        dueDate: '2025-06-30',
      },
      {
        key: '3',
        caseId: '#99001',
        clientName: ' Zenith Group',
        documentType: 'Legal Agreements',
        dueDate: '2025-06-28',
      },
    ],
    progressNotesData: [
      {
        title: 'Vertex Innovations',
        date: '2025-06-26',
        content: 'Discussed loan terms at 10:15 AM IST today. Awaiting financial docs.',
      },
      {
        title: 'Nexa Solutions',
        date: '2025-06-25',
        content: 'Reviewed initial application. Scheduled follow-up for tomorrow.',
      },
      {
        title: 'Pinnacle Corp',
        date: '2025-06-24',
        content: 'Approved loan application. Notified client at 11:00 AM IST.',
      },
    ],
  };