package main

func main() {}

// This exports an add and percentage function.

//export add
func add(x int, y int) int {
	return x + y
}

//export percentage
func percentage(x float32, y float32) float32 {
	return (x / y) * 100
}
