export type Profile = {
    siteName: string
    headerName: string
    headerRole: string
    headerDesc: string
    about: string
    contact: string
    linkedin: string
    github: string
    email: string
    logo: string
};

export type Study = {
    node: number
    title: string
    institution: string
    image: string
    location: string
    period: string
    degree: string
    country?: string
    grade?: string
    description: string[]
    badges?: string[]
}

export type Work = {
    node: number
    firm: string
    title: string
    location: string
    image: string
    country: string
    period: string
    description: string[]
    badges?: string[]
}