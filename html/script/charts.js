/* BotForge © 2024, all rights reserved. */

const ctx = document.getElementById('chart-test').getContext("2d");

const colors = {
    purple: "rgba(139, 92, 246, ",
    indigo: "rgba(80, 102, 120, "
};

const weight = [2, 4, 2, 5, 8, 6];

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const parentContainer = document.getElementById('servers-chart-div');
ctx.canvas.height = parentContainer.clientHeight;

const gradient = ctx.createLinearGradient(0, 25, 0, 300);
gradient.addColorStop(0, colors.purple + "0.5)");
gradient.addColorStop(0.35, colors.purple + "0.25)");
gradient.addColorStop(1, colors.purple + "0)");

const options = {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: 'Servers',
            fill: true,
            backgroundColor: gradient,
            pointBackgroundColor: colors.purple + "1)",
            borderColor: colors.purple + "1)",
            data: weight,
            tension: 0.40,
            borderWidth: 1,
            pointRadius: 3
        }]
    },
    options: {
        layout: {
            padding: 10
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    padding: 10,
                    autoSkip: false,
                    maxRotation: 15,
                    minRotation: 15
                }
            },
            y: {
                title: {
                    display: false,
                    text: "Guilds Amount",
                    padding: 10
                },
                grid: {
                    display: true,
                    color: colors.indigo + "0.25)"
                },
                ticks: {
                    beginAtZero: false,
                    max: 63,
                    min: 57,
                    padding: 10
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutSine'
        },
        defaultFontColor: colors.indigo + "1)",
        defaultFontFamily: "Fira Sans"
    }
};

window.onload = function() {
    window.myLine = new Chart(ctx, options);
};
