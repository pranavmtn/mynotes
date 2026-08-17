export type Step = {
  id: string;
  text: string;
  completed: boolean;
};

export type Plan = {
  id: string;
  title: string;
  notes: string;
  steps: Step[];
  createdAt: string;
  updatedAt: string;
};

export type Idea = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  color: string;
  plans: Plan[];
};

export type Tab = "idea" | "plan" | "growth";
