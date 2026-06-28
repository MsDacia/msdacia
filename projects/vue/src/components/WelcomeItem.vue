<template>
	<div class="item">
		<span class="icon-wrapper">
			<slot name="icon"></slot>
		</span>

		<div class="details">
			<h3>
				<slot name="heading"></slot>
			</h3>

			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.item {
	display: flex;
	margin-top: $size-32;
	position: relative;
}

.details {
	flex: 1;
	margin-left: $size-16;
}

.icon-wrapper {
	color: var(--color-text);
	display: flex;
	height: 32px;
	place-content: center;
	place-items: center;
	width: 32px;
}

h3 {
	color: var(--color-heading);
	font-size: 1.2rem;
	font-weight: $weight-medium;
	margin-bottom: 0.4rem;
}

@include min-width(small-desktop) {
	.item {
		margin-top: 0;
		padding: 0.4rem 0 $size-16 calc(var(--section-gap) / 2);
	}

	.icon-wrapper {
		background: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		height: 50px;
		left: -26px;
		position: absolute;
		top: calc(50% - 25px);
		width: 50px;
	}

	.item:before {
		border-left: 1px solid var(--color-border);
		bottom: calc(50% + 25px);
		content: ' ';
		height: calc(50% - 25px);
		left: 0;
		position: absolute;
	}

	.item:after {
		border-left: 1px solid var(--color-border);
		content: ' ';
		height: calc(50% - 25px);
		left: 0;
		position: absolute;
		top: calc(50% + 25px);
	}

	.item:first-of-type:before {
		display: none;
	}

	.item:last-of-type:after {
		display: none;
	}
}
</style>
