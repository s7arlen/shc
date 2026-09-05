// Sacred Heart of Jesus Church, Thodambila — Mass Timings
// Diocese of Mangalore / Bantwal Vicariate

export const weeklyMassSchedule = [
  { day: 'Monday', time: '6:30 AM', note: '' },
  { day: 'Tuesday', time: '6:30 AM', note: '' },
  { day: 'Wednesday', time: '6:30 AM', note: '' },
  { day: 'Thursday', time: '6:30 AM', note: '' },
  { day: 'Friday', time: '6:30 AM', note: 'First Friday Mass and Adoration at 5:00 PM' },
  { day: 'Saturday', time: '4:00 PM', note: 'Sunday Liturgy' },
  { day: 'Sunday', time: '7:30 AM', note: 'Sunday catechism for children follows Mass' },
];

export const massTimes = {
  sunday: [
    { time: '7:30 AM', language: 'Konkani', note: 'Sunday Mass (Catechism follows Mass)' },
  ],
  saturday: [
    { time: '4:00 PM', language: 'Konkani', note: 'Sunday Liturgy' },
  ],
  weekday: [
    { day: 'Monday – Friday', time: '6:30 AM', language: 'Konkani', note: '' },
    { day: 'First Friday', time: '5:00 PM', language: 'Konkani', note: 'First Friday Mass & Adoration' },
  ],
  footerNotes: [
    { label: 'First Friday:', value: '5:00 PM — Mass and Adoration' },
    { label: 'Sunday Catechism:', value: 'After the 7:30 AM Mass — For children' },
  ]
};


