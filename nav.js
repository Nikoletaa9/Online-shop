var navbar = ` 
        <nav>
			<div class="top">
				<div class="logo"><img src="../images/logo.png" width="100" height="100"> </div>
				<div class="tittle">ROCKS</div>
			</div>
			<div class="menu">
				<h3 class="menuItem"><a href="index.html">Home</a></h3>
				<h3 class="menuItem"><a href="about.html">About</a></h3>
				<h3 class="menuItem"><a href="products.html">Products</a></h3>
				<h3 class="menuItem"><a href="contact.html">Contact</a></h3>
			</div>
		</nav>`;

document.body.insertAdjacentHTML("afterbegin", navbar);