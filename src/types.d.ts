import { type } from "os";

export type Profile = {
    siteName: string
    headerName: string
    headerRole: string[]
    headerDesc: string
    about: string
    linkedin: string
    github: string
    email: string
    logoFull: string
    logoShort: string
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
    skills?: string[]
    netLabel?: string
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

export type Project = {
    node: number
    title: string
    link?: string
    badges?: string[]
    images?: string[]
    description: string
}

export type Languages = {
    [key: string]: number
}

export type SkillNode = {
    id: string
    group: number
}

export type SkillLink = {
    source: string
    target: string
    level: number
}

export type SkillGraph = {
    nodes: SkillNode[]
    links: SkillLink[]
}

export type AiMl = {
    ai: string[]
    rag: string[]
    ml: string[]
    techniques: string[]
}

export type DataEngineering = {
    databases: string[]
    frameworks: string[]
}

export type MlOps = {
    devops: string[]
    aws: string[]
    observability: string[]
}

export type Skills = {
    technology: {
        languages: Languages
    }
    aiml: AiMl
    data: DataEngineering
    mlops: MlOps
    also: string[]
    languages: Languages
    others: string[]
    graph: SkillGraph
}

export type Hobbies = {
    interests: {
        [key: string]: number
    }
    activities: string[]
}