export const option = {
    responsive: true,   // 자동 크기 조정 여부
    scales: {
        r: {
            grid:{
                // 동그랗게 할지 여부
                circular: false
            },
            pointLabels: {
                // 라벨 폰트 설정
                font: {
                    size: 12
                }
            }
        }
    },
    scale: {
        beginAtZero: true,
        max: 10,
        min: 0,
        stepSize: 2
    },
    plugins: {
        // 꼭다리
        legend: {
            display: false
        },
        // 툴팁 설정
        tooltip: {
            // 정확하게 꼭짓점을 대야 툴팁이 뜨게할지 여부
            intersect: false
        }
    },
    elements: {
        // 차트 요소 설정
        line: {
            borderWidth: 1 // 선의 굵기
        }
    }
}