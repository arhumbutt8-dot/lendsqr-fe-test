export interface Guarantor {
  name: string;
  phone: string;
  email: string;
  relationship: 'Sister' | 'Brother' | 'Friend' | 'Spouse';
}

export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
  tier: 1 | 2 | 3;
  accountBalance: number;
  accountNumber: string;
  bankName: string;
  bvn: string;
  gender: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married';
  children: 'None' | '1' | '2' | '3+';
  typeOfResidence: "Parent's Apartment" | 'Owned' | 'Rented';
  levelOfEducation: 'B.Sc' | 'M.Sc' | 'OND' | 'HND';
  employmentStatus: 'Employed' | 'Self-employed' | 'Unemployed';
  sectorOfEmployment: 'FinTech' | 'Education' | 'Healthcare' | 'Banking';
  durationOfEmployment: '1 year' | '2 years' | '3+ years';
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantor1: Guarantor;
  guarantor2: Guarantor;
}

export interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
}

export interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
