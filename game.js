// Phaser游戏配置
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// 游戏实例
var game = new Phaser.Game(config);

// 预加载资源
function preload() {
    // 加载图片资源
    game.load.image('background', 'assets/background.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('brick', 'assets/brick.png');
}

// 创建游戏对象
function create() {
    // 设置背景
    game.add.image(400, 300, 'background');

    // 创建小球
    var ball = game.physics.add.sprite(400, 500, 'ball');
    ball.setBounceY(0.7);
    ball.setCollideWorldBounds(true);

    // 创建挡板
    var paddle = game.physics.add.sprite(400, 560, 'paddle');
    paddle.setImmovable(true);
    paddle.setCollideWorldBounds(true);

    // 控制挡板
    game.input.keyboard.createCursorKeys();
}

// 游戏更新
function update() {
    if (game.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        paddle.setVelocityX(-500);
    } else if (game.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        paddle.setVelocityX(500);
    } else {
        paddle.setVelocityX(0);
    }
}

// 游戏开始
function startGame() {
    // 初始化游戏逻辑
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // 创建砖块组
    var brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 7,
            col: 3
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };
    var bricks = game.add.group();
    for (var c = 0; c < brickInfo.count.col; c++) {
        for (var r = 0; r < brickInfo.count.row; r++) {
            var brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
            var brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
            var newBrick = game.add.sprite(brickX, brickY, 'brick');
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            bricks.add(newBrick);
        }
    }

    // 创建得分和生命数显示
    var scoreText = game.add.text(10, 10, 'Score: 0', { font: '18px Arial', fill: '#0095DD' });
    var livesText = game.add.text(game.world.width - 100, 10, 'Lives: 3', { font: