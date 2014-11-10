var N = N || {};

N.VideoSphere = function(options) {
	this.options = options;

	this.init(options);
};

N.VideoSphere.prototype.init = function(options) {
	var container = new THREE.Object3D();

	var mesh = new THREE.Mesh();

	var geo = new THREE.SphereGeometry(500, 60, 40);
	geo.applyMatrix(new THREE.Matrix4().makeScale( -1, 1, 1 ));

	var video = document.createElement('video');
	video.width = options.video.width;
	video.height = options.video.height;
	video.autoplay = false;
	video.src = options.video.src;
	this.video = video;

	var texture = new THREE.VideoTexture(video);
	this.texture = texture;

	var mat = new THREE.MeshBasicMaterial({ map: texture });
	//mat.side = THREE.BackSide;

	var mesh = new THREE.Mesh(geo, mat);

	container.add(mesh);

	this.mesh = mesh;
	this.container = container;
};

N.VideoSphere.prototype.getMesh = function() {
	return this.mesh;
};

N.VideoSphere.prototype.getContainer = function() {
	return this.container;
};


// player controls
N.VideoSphere.prototype.restart = function() {
	var video = this.video;
	if (!video.paused) {
		video.load();
		video.play();
	}
};

N.VideoSphere.prototype.getPc = function() {
	var video = this.video;
	if (video.readyState != 4)
		return 0;

	var dur = video.duration;
	var cur = video.currentTime;
	return cur/dur;
};

N.VideoSphere.prototype.seekBy = function(pc) {
	var curPc = getPc();
	seekTo(curPc*100 + pc);
};

N.VideoSphere.prototype.seekTo = function(pc) {
	var video = this.video;
	var dur = video.duration;
	var cur = video.currentTime;

	pc /= 100;
	var t = pc * dur;
	t = Math.min(Math.max(0, t), dur);
	video.currentTime = t;
};

N.VideoSphere.prototype.togglePlay = function() {
	var video = this.video;
	video.paused ? video.play() : video.pause();  
};

N.VideoSphere.prototype.toggleMute = function(val) {
	this.video.muted = !this.video.muted;
};


N.VideoSphere.prototype.update = function(dt) {

};

N.VideoSphere.prototype.destroy = function() {
	this.video.pause();
	this.video.src = '';
	this.video.removeAttribute('src');

	this.video = null;
};