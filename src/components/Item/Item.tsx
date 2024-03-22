import { Box } from '@mui/material';
import { ReactNode } from 'react';


interface ItemProp {
	children: ReactNode
}

export const Item = (props: ItemProp) => {
	const { children } = props;
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				p: 1,
				borderRadius: 1,
			}}
		>
			<Box
				sx={{
					p: 1,
					color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
					borderColor: (theme) =>
						theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
					borderRadius: 2,
					fontSize: '0.875rem',
					fontWeight: '700',
				}}
			>
				{children}
			</Box>
		</Box>
	);
}