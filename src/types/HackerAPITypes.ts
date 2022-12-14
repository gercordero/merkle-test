export interface TopStories {
    TopStories: number[];
}

export interface Item {
    by:          string;
    descendants: number;
    id:          number;
    kids:        number[];
    score:       number;
    time:        number;
    title:       string;
    type:        string;
    url:         string;
}

export interface User {
    created:   number;
    id:        string;
    karma:     number;
    submitted: number[];
}
