interface SVGIconProps {
    path: string;
}

export function SVGIcon({ path }: SVGIconProps) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d={path} />
        </svg>
    );
}
