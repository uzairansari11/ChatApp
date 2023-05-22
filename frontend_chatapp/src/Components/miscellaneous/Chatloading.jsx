import { Stack } from "@chakra-ui/react";
import React from "react";
import { Skeleton } from "@chakra-ui/react";
const Chatloading = ({ number }) => {
	let skeletonNumber = new Array(number).fill(0);
	return (
		<Stack>
			{skeletonNumber.map((ele, index) => {
				return <Skeleton height="40px" key={index} />;
			})}
		</Stack>
	);
};

export default Chatloading;
