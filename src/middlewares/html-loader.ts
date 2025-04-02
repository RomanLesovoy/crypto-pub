import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middlewareLoader(request: NextRequest) {
  if (
    request.headers.get('Accept')?.includes('text/html')
  ) {
    // Создаем измененную HTML страницу с встроенным лоадером
    const enhancedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Загрузка...</title>
        <style>
          #splash-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #111827;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            transition: opacity 0.5s ease;
          }
          .loader-spinner {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: #10b981;
            animation: spinner-rotate 1s linear infinite;
          }
          @keyframes spinner-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loader-text {
            margin-top: 16px;
            color: #e5e7eb;
            font-family: sans-serif;
          }
        </style>
      </head>
      <body>
        <div id="splash-loader">
          <div class="loader-container">
            <div class="loader-spinner"></div>
            <div class="loader-text">Загрузка...</div>
          </div>
        </div>
        
        <script>     
          // Загружаем оригинальный контент через fetch
          fetch("${request.nextUrl.href}", {
            headers: {
              'X-Skip-Loader': '1'
            }
          })
          .then(response => response.text())
          .then(html => {
            // Плавно скрываем лоадер
            const loader = document.getElementById('splash-loader');
            setTimeout(() => {
              loader.style.opacity = '0';
              
              // Загружаем полученный HTML
              setTimeout(() => {
                document.open();
                document.write(html);
                document.close();
              }, 100); // после анимации скрытия
            }, 1000); // минимальное время показа лоадера
          })
          .catch(error => {
            console.error('Ошибка загрузки контента:', error);
            window.location.href = "${request.nextUrl.href}";
          });
        </script>
      </body>
      </html>
    `;

    // Если это не повторный запрос и не запрос с хедером X-Skip-Loader
    if (!request.headers.get('X-Skip-Loader')) {
      const response = new NextResponse(enhancedHtml, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
      
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};