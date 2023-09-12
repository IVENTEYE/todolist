export interface ITaskAndNote {
    id: string;
    day: string;
    month: string;
}

export interface ITask extends ITaskAndNote {
    checkState: boolean;
    title: string;
    dataVisible: boolean;
}

export interface INote extends ITaskAndNote {
    label: string;
    description: string;
    selected: boolean;
    categoryIcon: string;
    category: string;
}

export interface ICategory {
    text: string;
    icon: string;
}

export interface IRedact {
    visible: boolean
    id: string,
    title: string,
    description: string,
    category: string,
    categoryColor: string,
}