import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/app/components/ui/badge"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEnvelope, faPenNib } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"

export function SectionCards() {
    return (
        <div className="flex gap-6">
            {/* Card 1 */}
            <Card className="flex-none w-64 flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPenNib} className="text-[#C52233] w-4 h-3" />
                         <CardDescription>Posts</CardDescription>
                    </div>

                    <CardTitle className="text-3xl font-semibold tabular-nums">
                        124
                    </CardTitle>
                    <CardAction>
                    </CardAction>
                </CardHeader>
                <CardFooter className="mt-auto flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                        Your total number of posts
                    </div>
                </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="flex-none w-64 flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className="text-[#C52233] w-4 h-3" />
                         <CardDescription>Users</CardDescription>
                    </div>

                    <CardTitle className="text-3xl font-semibold tabular-nums">
                        124
                    </CardTitle>
                    <CardAction>
                    </CardAction>
                </CardHeader>
                <CardFooter className="mt-auto flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                        Your total number of users
                    </div>
                </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="flex-none w-64 flex flex-col">
                <CardHeader>
                   <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} className="text-[#C52233] w-4 h-3" />
                         <CardDescription>Inquiries</CardDescription>
                    </div>

                    <CardTitle className="text-2xl font-semibold tabular-nums">
                        356
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="mt-auto flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                        Inquiries for the last 3 months
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}




