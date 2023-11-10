export interface ContainerInterface { 
    children: any,
    className: any
}

export interface LoaderInterface {
    size?: string | null,
    color?: string | null,
    className?: string,
}

interface menuList {
    name: string,
    href: string,
}

export interface HomeNavbarMenuList {
    menuList: Array<menuList>
}
