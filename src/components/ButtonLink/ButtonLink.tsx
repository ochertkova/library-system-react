import {Button, Link} from '@mui/material'

interface ButtonLinkProps {
    buttonText: string;
    buttonLink: string;
}

const ButtonLink = ({ buttonText, buttonLink }: ButtonLinkProps) => {
    return (
        <Button variant = "outlined">
            <Link href={buttonLink}>
                {buttonText}
            </Link>
        </Button>
    )
}

export default ButtonLink;