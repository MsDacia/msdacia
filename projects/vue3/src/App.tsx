import HelloWorld from './components/HelloWorld'

export default {
	name: 'App',
	components: {
	  HelloWorld
	},
	setup() {
		return () => <div>
			tsx - Hello David while you are staring a me write these typos.
			<HelloWorld message="Hello Vue 3.0 + Vite" />
		</div>
	},
}

/*
Suspense is a new feature that renders a default/fallback component until the main component fetches the data.

Sometimes we use async operations to fetch data from the server. Instead of handing the template with v-if and then setting it back when we return the data, Suspense does it for us.

Suspense can be used for both parts of the template, or the whole template:

<Suspense>
    <template #default>
      <div v-for="item in articleList" :key="item.id">
        <article>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </template>
    <template #fallback>
      Articles loading...
    </template>
  </Suspense>
*/

