export default async function play() {
    type Greeting = { message: string };
    type InferHelloProps<T> = T extends () => Promise<{ props: infer Props }> ? Props : never;

    const getHelloProps = async () => {
        const greeting: Greeting = { message: "Hi friends!" };

        return {
            props: {
                greeting,
                data: {
                    cars: ["car1", "car2"]
                }
            }
        };
    }

    function sayHello(props: InferHelloProps<typeof getHelloProps>) {
        console.log(props.greeting.message);
    }

    const data = await getHelloProps();
    sayHello(data.props);
}