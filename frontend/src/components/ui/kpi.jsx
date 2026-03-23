import { 
    Card,
    CardDescription,
    CardHeader,
    CardTitle, 
} from "@/components/ui/card"

export const Kpi = ({children, ...props}) => {
    return (<Card className={"bg-(--card-bakground) font-bold font-sans h-32 w-60 border-1 border-(--accent)"}>
              <CardHeader className={'flex flex-col align-middle justify-center gap-2 px-6 w-full h-full'}>
                <CardTitle className={'text-xl text-(--accent) font-semibold self-center'} >{props.title}</CardTitle>
                <CardDescription className={'text-xl text-(--text) self-center'}>{children}</CardDescription>
              </CardHeader>
            </Card>
            )
}