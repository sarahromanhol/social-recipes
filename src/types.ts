export type authenticationData = {
    id: string
}

export type recipe = {
    id: string
    title: string
    description: string
    createdAt: string
    authorId: string
}

export type user = {
    id: string
    name: string
    email: string
    password: string
}

export const userTableName = 'social_recipes_users'
export const recipeTableName = 'social_recipes_recipes'