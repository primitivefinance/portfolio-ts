async function main() {
    console.log("Hello World")
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})