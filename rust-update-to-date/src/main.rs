fn merge_sort(mut arr: Vec<i32>, left: usize, right: usize) -> Vec<i32> {
	if right - 1 > left {
		let mid = left + (right - left) / 2;
		arr = merge_sort(arr, left, mid);
		arr = merge_sort(arr, mid, right);
		arr = merge(arr, left, mid, right);
	}
	arr
}

fn merge(mut arr: Vec<i32>, left: usize, mid: usize, right: usize) -> Vec<i32> {
	let n1 = mid - left;
	let n2 = right - mid;
	let mut L1 = arr.clone();
	let mut L2 = arr.clone();
	let L = &L1[left..mid];
	let R = &L2[mid..right];
	/* merge the temp arrays back into arr[l..r] */
	let mut i = 0; // initial index of first subarray
	let mut j = 0; // initial index of second subarray
	let mut k = left; // initial index of the merged subarray
	while i < n1 && j < n2 {
		if L[i] < R[j] {
			arr[k] = L[i];
			i = i + 1;
		}
		else {
			arr[k] = R[j];
			j = j + 1;
		}
		k = k + 1;
	}
	while i < n1 {
		arr[k] = L[i];
		i = i + 1;
		k = k + 1;
	}
	/* Copy the remaining elements of R[], if there are any */
	while j < n2 {
		arr[k] = R[j];
		j = j + 1;
		k = k + 1;
	}
	arr
}

fn main() {
	let mut arr: Vec<i32> = vec![10, 35, 23, 48, 92, 7, 54];
	arr = merge_sort(arr.clone(), 0, arr.len());
	print!("Sorted array is {:?}", arr);
	print!("{}", 7 / 2)
}