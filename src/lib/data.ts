import { PlaceHolderImages } from './placeholder-images';
import { BookText, FileText, Link as LinkIcon, Library, Globe, CalendarDays, Mail } from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Schedule' },
  { href: '/committees', label: 'Committees' },
];
 
export const newsItems = [
  {
    id: 1,
    title: 'Annual Conference Registration Opens',
    date: '2024-08-15',
    summary: 'Registration for our flagship annual Model UN conference is now open. Secure your spot early!',
    image: PlaceHolderImages.find(p => p.id === 'news-1')!,
  },
  {
    id: 2,
    title: 'Workshop on Public Speaking Announced',
    date: '2024-07-22',
    summary: 'Join us for an exclusive workshop on public speaking and debate, led by a renowned guest speaker.',
    image: PlaceHolderImages.find(p => p.id === 'news-2')!,
  },
  {
    id: 3,
    title: 'DavRohini Team Wins Best Delegation Award',
    date: '2024-06-30',
    summary: 'Our team has once again proven their mettle by winning the Best Delegation award at the recent Inter-School MUN.',
    image: PlaceHolderImages.find(p => p.id === 'news-3')!,
  },
];

export const events = [
    {
        id: 1,
        title: 'Annual Conference 2024',
        date: new Date('2024-10-25T09:00:00'),
        description: 'Our flagship 3-day Model UN conference simulating various UN committees.'
    },
    {
        id: 2,
        title: 'Rules of Procedure Workshop',
        date: new Date('2024-09-10T14:00:00'),
        description: 'A workshop for beginners to get acquainted with MUN rules and procedures.'
    },
    {
        id: 3,
        title: 'Position Paper Writing Session',
        date: new Date('2024-09-24T15:30:00'),
        description: 'Learn how to write compelling position papers that stand out.'
    },
    {
        id: 4,
        title: 'Club Elections',
        date: new Date('2025-01-15T13:00:00'),
        description: 'Annual elections for the new MUN club board.'
    },
];

export const conferences = [
    {
      id: 1,
      name: 'DavRohini Annual MUN 2024',
      committees: [
        { id: 'uncsw', name: 'United Nations Commission on the Status of Women (UNCSW)', topic: 'Addressing the impact of climate-induced disasters and armed conflicts on the accessibility of reproductive and maternal healthcare services for women in fragile and conflict-affected states.', guideUrl: '#' },
        { id: 'unhrc', name: 'United Nations Human Rights Council (UNHRC)', topic: 'Deliberating on the escalation of authoritarian digital surveillance and its threat to the right to peaceful assembly, political expression, and individual privacy in the age of AI and predictive policing.', guideUrl: '#' },
        { id: 'aippm', name: 'All India Political Parties Meet (AIPPM)', topic: 'Reassessing the balance of power in India’s federal structure: ensuring fiscal autonomy, transparent Centre–State relations, and the constitutional accountability of gubernatorial authority.', guideUrl: '#' },
        { id: 'ipc', name: 'International Press Corps (IPC)', topic: 'Real-time coverage, investigative journalism & photojournalism. Reporting on all committees, creation of the official post-conference publication, and real-time journalism simulation.', guideUrl: '#' },
        { id: 'ipl', name: 'IPL Mega Auction (Special Committee)', topic: 'A mock auction simulating strategic team building and franchise management. Budget allocation, player bidding, and application of managerial, economic, and cricket knowledge.', guideUrl: '#' },
      ]
    },
    {
        id: 2,
        name: 'Intra-School Practice Debate',
        committees: [
          { id: 'crisis', name: 'Joint Crisis Committee (JCC)', topic: 'The Cuban Missile Crisis - 1962', guideUrl: '#' },
          { id: 'ecosoc', name: 'Economic and Social Council (ECOSOC)', topic: 'Sustainable Development in Post-Conflict Nations', guideUrl: '#' },
        ]
    }
];

export const resources = [
    {
        category: 'Core Documents',
        items: [
            { id: 1, title: 'Rules of Procedure', description: 'The official rules governing all committee sessions.', link: '#', icon: FileText },
            { id: 2, title: 'Position Paper Guidelines', description: 'A detailed guide on how to structure and write your position papers.', link: '#', icon: FileText },
            { id: 3, title: 'Chairing Handbook', description: 'Essential reading for all aspiring and current committee chairs.', link: '#', icon: BookText },
        ]
    },
    {
        category: 'Research & Preparation',
        items: [
            { id: 4, title: 'UN Charter', description: 'The foundational treaty of the United Nations.', link: 'https://www.un.org/en/about-us/un-charter', icon: LinkIcon },
            { id: 5, title: 'UN Digital Library', description: 'Access to UN documents, voting data, and speeches.', link: 'https://digitallibrary.un.org/', icon: Library },
            { id: 6, title: 'World Bank Open Data', description: 'Free and open access to global development data.', link: 'https://data.worldbank.org/', icon: LinkIcon },
        ]
    }
]
