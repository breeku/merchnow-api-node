export interface Icatalog {
	Content: unknown // later cast as string or Icontent
	NumberOfItems: number
	ItemsReturned: number
	Enabled: boolean
	Offset: number
	Limit: number
}

export interface Icontent {
	decoration?: string
	description: Idescription[]
	images: Iimages
}

export interface Idescription {
	content: string
	tag?: string
	url?: string
}

export interface Iimages {
	alt?: string
	lg?: string
	md?: string
	sm?: string
	xl?: string
}
