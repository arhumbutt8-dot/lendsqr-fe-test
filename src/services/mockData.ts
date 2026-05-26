import type { User } from '@/types';

const ORGANIZATIONS = ['Lendsqr', 'Irorun', 'Lendstar'] as const;
const BANKS = ['Providus Bank', 'GTBank', 'First Bank', 'Access Bank', 'Zenith Bank'] as const;
const STATUSES = ['Active', 'Inactive', 'Pending', 'Blacklisted'] as const;
const GENDERS = ['Male', 'Female'] as const;
const MARITAL = ['Single', 'Married'] as const;
const CHILDREN = ['None', '1', '2', '3+'] as const;
const RESIDENCE = ["Parent's Apartment", 'Owned', 'Rented'] as const;
const EDUCATION = ['B.Sc', 'M.Sc', 'OND', 'HND'] as const;
const EMPLOYMENT = ['Employed', 'Self-employed', 'Unemployed'] as const;
const SECTOR = ['FinTech', 'Education', 'Healthcare', 'Banking'] as const;
const DURATION = ['1 year', '2 years', '3+ years'] as const;
const RELATIONSHIPS = ['Sister', 'Brother', 'Friend', 'Spouse'] as const;

const FIRST_NAMES = [
  'Adaeze', 'Chukwuemeka', 'Fatima', 'Oluwaseun', 'Amara', 'Babatunde', 'Chidinma',
  'Emeka', 'Funmilayo', 'Gbenga', 'Halima', 'Ibrahim', 'Jumoke', 'Kelechi', 'Lola',
  'Musa', 'Ngozi', 'Obinna', 'Patience', 'Quadri', 'Rashida', 'Segun', 'Taiwo',
  'Uche', 'Victoria', 'Wale', 'Xena', 'Yetunde', 'Zainab', 'Akin', 'Bola', 'Chibundo',
  'Damilola', 'Eze', 'Folake', 'Grace', 'Henry', 'Ifeoma', 'James', 'Kemi',
];

const LAST_NAMES = [
  'Adeyemi', 'Okonkwo', 'Bello', 'Nwosu', 'Adesanya', 'Okafor', 'Ibrahim', 'Eze',
  'Adeleke', 'Obi', 'Musa', 'Chukwu', 'Abubakar', 'Nwachukwu', 'Olawale', 'Dike',
  'Suleiman', 'Ogundele', 'Nnamdi', 'Fashola', 'Oyelaran', 'Effiom', 'Amadi', 'Okeke',
  'Lawal', 'Onyekachi', 'Salami', 'Nwofor', 'Adebayo', 'Ogundimu', 'Uchenna', 'Taiwo',
];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function randInt(min: number, max: number, seed: number): number {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

function generatePhone(seed: number): string {
  const prefixes = ['0803', '0806', '0810', '0813', '0816', '0703', '0706', '0901', '0905'];
  const prefix = pick(prefixes, seed);
  const suffix = String(randInt(1000000, 9999999, seed * 7)).padStart(7, '0');
  return `${prefix}${suffix}`;
}

function generateDate(seed: number): string {
  const start = new Date(2019, 0, 1).getTime();
  const end = new Date(2023, 11, 31).getTime();
  const ts = start + seededRandom(seed * 13) * (end - start);
  const d = new Date(ts);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${hour}:${min} ${ampm}`;
}

function generateGuarantor(seed: number) {
  const firstName = pick(FIRST_NAMES, seed * 3);
  const lastName = pick(LAST_NAMES, seed * 7);
  return {
    name: `${firstName} ${lastName}`,
    phone: generatePhone(seed * 11),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    relationship: pick(RELATIONSHIPS, seed * 5),
  };
}

export function generateMockUsers(count = 500): User[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = i + 1;
    const firstName = pick(FIRST_NAMES, idx * 2);
    const lastName = pick(LAST_NAMES, idx * 3);
    const username = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}${idx}@${pick(['gmail', 'yahoo', 'outlook'], idx)}.com`;
    const balance = randInt(10000, 900000, idx * 17);
    const incomeMin = randInt(50, 400, idx * 19);
    const incomeMax = randInt(401, 900, idx * 23);
    const loanAmt = randInt(10, 80, idx * 29);
    const tier = pick([1, 2, 3] as const, idx * 4);

    return {
      id: `LSQ${String(idx).padStart(6, '0')}`,
      organization: pick(ORGANIZATIONS, idx),
      username,
      email,
      phone: generatePhone(idx),
      dateJoined: generateDate(idx),
      status: pick(STATUSES, idx * 6),
      tier,
      accountBalance: balance,
      accountNumber: String(randInt(1000000000, 9999999999, idx * 31)),
      bankName: pick(BANKS, idx * 8),
      bvn: String(randInt(10000000000, 99999999999, idx * 37)),
      gender: pick(GENDERS, idx),
      maritalStatus: pick(MARITAL, idx * 2),
      children: pick(CHILDREN, idx * 3),
      typeOfResidence: pick(RESIDENCE, idx * 5),
      levelOfEducation: pick(EDUCATION, idx * 7),
      employmentStatus: pick(EMPLOYMENT, idx * 9),
      sectorOfEmployment: pick(SECTOR, idx * 11),
      durationOfEmployment: pick(DURATION, idx * 13),
      officeEmail: `${firstName.toLowerCase()}@${pick(['lendsqr', 'irorun', 'lendstar'], idx)}.com`,
      monthlyIncome: `₦${incomeMin},000.00 – ₦${incomeMax},000.00`,
      loanRepayment: `₦${loanAmt},000`,
      twitter: `@${firstName.toLowerCase()}${idx}`,
      facebook: username,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      guarantor1: generateGuarantor(idx * 41),
      guarantor2: generateGuarantor(idx * 43),
    };
  });
}
